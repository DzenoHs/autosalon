 import axios from 'axios';
// const axios = require('axios');

const username='REMOVED'
const password='REMOVED'

const credentials=`${username}:${password}`

const encoded= Buffer.from(credentials).toString('base64')

const MOBILE_API_CONFIG = {
  baseURL: 'https://services.mobile.de/search-api/search',
  headers: {
    'Authorization': `Basic ${encoded}`,
    'Accept': 'application/vnd.de.mobile.api+json',
    'User-Agent': 'AutoSalon-Proxy/1.0',
    'Content-Type': 'application/json'
  },
  timeout: 15000
};

// Cache sistem
const apiCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minuta u milisekundama
const MAX_CACHE_SIZE = 100; // Maksimalno 100 cache unosa

// Helper funkcije za cache
const generateCacheKey = (params) => {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});
  return JSON.stringify(sortedParams);
};

const getCachedData = (cacheKey) => {
  const cached = apiCache.get(cacheKey);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > CACHE_DURATION) {
    apiCache.delete(cacheKey);
    return null;
  }
  
  console.log(`🎯 Cache HIT za ključ: ${cacheKey.substring(0, 50)}...`);
  return cached.data;
};

const setCachedData = (cacheKey, data) => {
  // Očisti stari cache ako je dostignut limit
  if (apiCache.size >= MAX_CACHE_SIZE) {
    const firstKey = apiCache.keys().next().value;
    apiCache.delete(firstKey);
    console.log(`🧹 Uklonjen najstariji cache unos`);
  }
  
  apiCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  console.log(`💾 Cache SAVE za ključ: ${cacheKey.substring(0, 50)}... (${apiCache.size}/${MAX_CACHE_SIZE})`);
};

const clearExpiredCache = () => {
  const now = Date.now();
  let removedCount = 0;
  
  for (const [key, value] of apiCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      apiCache.delete(key);
      removedCount++;
    }
  }
  
  if (removedCount > 0) {
    console.log(`🧹 Očišćeno ${removedCount} isteklih cache unosa`);
  }
};
export const cars = async (req, res) => {
  const startTime = Date.now();
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    // Očisti expired cache unose
    clearExpiredCache();

    // Build API parameters
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 100, 100);

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

    // Generiraj cache ključ
    const cacheKey = generateCacheKey(apiParams);
    
    // Provjeri cache prvo
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
      const responseTime = Date.now() - startTime;
      console.log(`⚡ Cache response u ${responseTime}ms`);
      
      return res.status(200).json({
        ...cachedResult,
        cached: true,
        responseTime,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`🔍 Cache MISS - dohvaćam iz Mobile.de API...`);

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

    console.log(`🚗 Šaljem ${cars.length} automobila od ukupno ${total} (pageSize: ${pageSize})`);

    // Process response data
    const responseData = {
      success: true,
      total,
      currentPage: pageNumber,
      pageSize,
      maxPages: Math.ceil(total / pageSize),
      ads: cars,
      cached: false,
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime
    };

    // Spremi u cache prije slanja odgovora
    setCachedData(cacheKey, responseData);

    res.status(200).json(responseData);

  } catch (error) {
    console.error('❌ Greška u cars API:', error);
    
    const responseTime = Date.now() - startTime;
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      responseTime,
      timestamp: new Date().toISOString()
    });
  }
};

// Cache statistike endpoint
export const getCacheStats = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  const now = Date.now();
  const activeEntries = [];
  let expiredCount = 0;

  for (const [key, value] of apiCache.entries()) {
    const age = now - value.timestamp;
    const isExpired = age > CACHE_DURATION;
    
    if (isExpired) {
      expiredCount++;
    } else {
      activeEntries.push({
        key: key.substring(0, 100) + (key.length > 100 ? '...' : ''),
        age: Math.round(age / 1000),
        remainingTTL: Math.round((CACHE_DURATION - age) / 1000)
      });
    }
  }

  const stats = {
    cacheSize: apiCache.size,
    maxCacheSize: MAX_CACHE_SIZE,
    activeEntries: activeEntries.length,
    expiredEntries: expiredCount,
    cacheDurationMinutes: CACHE_DURATION / (60 * 1000),
    entries: activeEntries,
    timestamp: new Date().toISOString()
  };

  res.status(200).json(stats);
};

// Manual cache clear endpoint
export const clearCache = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  const previousSize = apiCache.size;
  apiCache.clear();

  console.log(`🧹 Manual cache clear - uklonjeno ${previousSize} unosa`);

  res.status(200).json({
    success: true,
    message: `Cache cleared successfully. Removed ${previousSize} entries.`,
    previousSize,
    currentSize: apiCache.size,
    timestamp: new Date().toISOString()
  });
};