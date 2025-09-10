const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5003;

// CORS setup
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

// const IMAGE_ACCESS_TOKEN = process.env.IMAGE_ACCESS_TOKEN || 'ovde-tvoj-token';

app.use(cors(corsOptions));
app.use(express.json());

// OPTIONS handler
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.status(200).json({ success: true, message: 'CORS preflight OK' });
});

// Mobile.de API config
const MOBILE_API_CONFIG = {
  baseURL: 'https://services.sandbox.mobile.de/search-api/search',
  headers: {
    'Authorization': 'Basic c2VhcmNoLWdlbmVyaWM6c2VhcmNoLWdlbmVyaWM=',
    'Accept': 'application/vnd.de.mobile.api+json',
    'User-Agent': 'AutoSalon-Proxy/1.0',
    'Content-Type': 'application/json'
  },
  timeout: 15000
};

// Basic rate limiting
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS_PER_WINDOW = 50;

function checkRateLimit(clientIP) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, []);
  }

  const clientRequests = requestCounts.get(clientIP);
  const recentRequests = clientRequests.filter(timestamp => timestamp > windowStart);
  requestCounts.set(clientIP, recentRequests);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recentRequests.push(now);
  requestCounts.set(clientIP, recentRequests);
  return true;
}

// Health check
app.get('/health', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0'
  });
});

// Main cars API endpoint - Direct proxy with minimal processing
app.get('/api/cars', async (req, res) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown';

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return res.status(200).json({
        success: false,
        error: 'Rate limit exceeded. Please wait before making more requests.',
        retryAfter: 60
      });
    }

    // Build API parameters
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 20, 100);

    const apiParams = {
      pageNumber,
      pageSize,
      damageUnrepaired: false,
      isBartered: false,
      lang: 'de'
    };

    // Add filters from query
    if (req.query.make) apiParams.make = req.query.make;
    if (req.query.model) apiParams.model = req.query.model;
    if (req.query.priceFrom) apiParams.priceFrom = req.query.priceFrom;
    if (req.query.priceTo) apiParams.priceTo = req.query.priceTo;
    if (req.query.yearFrom) apiParams.firstRegistrationFrom = `${req.query.yearFrom}-01-01`;
    if (req.query.yearTo) apiParams.firstRegistrationTo = `${req.query.yearTo}-12-31`;
    if (req.query.fuel) apiParams.fuel = req.query.fuel;
    if (req.query.gearbox) apiParams.gearbox = req.query.gearbox;

    // Build API URL
    const queryString = new URLSearchParams(apiParams).toString();
    const apiUrl = `${MOBILE_API_CONFIG.baseURL}?imageCount.min=1&${queryString}`;

    // Make API call with retry
    let response;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        response = await axios.get(apiUrl, {
          headers: MOBILE_API_CONFIG.headers,
          timeout: MOBILE_API_CONFIG.timeout,
          validateStatus: (status) => status >= 200 && status < 500
        });

        if (response.status === 200) break;
        if (attempts === maxAttempts) throw new Error(`API returned status ${response.status}`);
      } catch (error) {
        if (attempts === maxAttempts) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    if (!response || response.status !== 200) {
      throw new Error('Failed to fetch data from mobile.de API');
    }

    const apiData = response.data;
    console.log("apiData")
    console.log(apiData.ads[0])

    // Process API response - direct passthrough with minimal structure
    let cars = [];
    let total = 0;

    if (apiData.ads && Array.isArray(apiData.ads)) {
      cars = apiData.ads;
      total = apiData.total || apiData.totalCount || cars.length;
    } else if (apiData.results && Array.isArray(apiData.results)) {
      cars = apiData.results;
      total = apiData.totalResults || apiData.count || cars.length;
    } else if (Array.isArray(apiData)) {
      cars = apiData;
      total = cars.length;
    } else if (apiData.data && Array.isArray(apiData.data)) {
      cars = apiData.data;
      total = apiData.total || cars.length;
    } else {
      cars = [];
      total = 0;
    }

    // Direct response - minimal processing
    const responseData = {
      success: true,
      total,
      currentPage: pageNumber,
      pageSize,
      maxPages: Math.ceil(total / pageSize),
      ads: cars, // Direct passthrough of car data
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime
    };

    res.status(200).json(responseData);

  } catch (error) {
    const responseTime = Date.now() - startTime;

    // Simple error response - no fallback
    res.status(500).json({
      success: false,
      error: 'API temporarily unavailable',
      message: error.message,
      timestamp: new Date().toISOString(),
      responseTime
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    availableEndpoints: ['/health', '/api/cars']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AutoSalon API Server pokrenut na http://localhost:${PORT}`);
  console.log('🔗 CORS omogućen za sve domene');
  console.log('📡 Proxy za: https://services.sandbox.mobile.de/search-api/search');
  console.log('🔑 Kredencijali: search-generic (sandbox)');
  console.log('⏱️ API Timeout: 15000ms');
  console.log('🔄 Rate Limit: 50 zahtjeva po minuti');
  console.log('');
  console.log('📋 Dostupni endpointi:');
  console.log('   GET  /health                 - Health check');
  console.log('   GET  /api/cars               - Proxy za automobile');
  console.log('');
  console.log('🔧 Primjer poziva:');
  console.log(`   curl "http://localhost:${PORT}/api/cars?pageNumber=1&pageSize=100"`);
  console.log('');
  console.log('🌟 AutoSalon server spreman za rad!');
});

module.exports = app;
