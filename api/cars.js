import axios from 'axios';

const username = process.env.MOBILE_DE_USERNAME || 'REMOVED';
const password = process.env.MOBILE_DE_PASSWORD || 'REMOVED';
const credentials = `${username}:${password}`;
const encoded = Buffer.from(credentials).toString('base64');

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

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  // Set CORS headers
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  try {
    const {
      pageNumber = 1,
      pageSize = 100,
    } = req.query;

    const requestedPageSize = Math.min(parseInt(pageSize) || 100, 100);
    const mobileApiPageSize = 20;
    const maxPagesToFetch = 5;

    console.log(`🔍 Dohvaćam ${maxPagesToFetch} stranica iz Mobile.de API...`);

    let allCars = [];
    let totalCount = 0;
    
    for (let currentPageNum = 1; currentPageNum <= maxPagesToFetch && allCars.length < 100; currentPageNum++) {
      const apiParams = {
        pageNumber: currentPageNum,
        pageSize: mobileApiPageSize,
        damageUnrepaired: false,
        isBartered: false,
        lang: 'de'
      };
      
      const queryString = new URLSearchParams(apiParams).toString();
      const apiUrl = `${MOBILE_API_CONFIG.baseURL}?imageCount.min=1&${queryString}`;

      console.log(`📡 Pozivam stranicu ${currentPageNum}/${maxPagesToFetch}`);

      try {
        const response = await axios.get(apiUrl, {
          headers: MOBILE_API_CONFIG.headers,
          timeout: MOBILE_API_CONFIG.timeout,
        });

        if (response.status === 200 && response.data.ads) {
          allCars.push(...response.data.ads);
          totalCount = response.data.total || response.data.totalCount || totalCount;
          console.log(`✅ Stranica ${currentPageNum}: ${response.data.ads.length} automobila`);
        }
        
        if (!response.data.ads || response.data.ads.length === 0) {
          console.log(`🛑 Nema više rezultata na stranici ${currentPageNum}`);
          break;
        }
      } catch (pageError) {
        console.log(`⚠️ Stranica ${currentPageNum} nije uspešna:`, pageError.message);
        continue;
      }
    }

    const cars = allCars.slice(0, Math.min(requestedPageSize, 100));
    const total = totalCount || cars.length;
    
    console.log(`🎯 Ukupno dohvaćeno: ${allCars.length} automobila, vraćam: ${cars.length}`);

    const responseData = {
      success: true,
      total,
      currentPage: parseInt(pageNumber),
      pageSize: requestedPageSize,
      maxPages: Math.ceil(total / requestedPageSize),
      ads: cars,
      cached: false,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(responseData);

  } catch (error) {
    console.error('❌ Greška u cars API:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
