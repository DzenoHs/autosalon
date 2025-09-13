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
    const requestedPageSize = Math.min(parseInt(req.query.pageSize) || 100, 100);
    
    // Mobile.de API obično vraća max 20 automobila po stranici
    // Da dohvatimo 75-100 različitih automobila, pozvaćemo stranice 1-5
    const mobileApiPageSize = 20;
    const maxPagesToFetch = 5; // Dohvatiti prvih 5 stranica za 100 automobila

    const apiParams = {
      pageNumber,
      pageSize: mobileApiPageSize,
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

    console.log(`🔍 Cache MISS - dohvaćam ${maxPagesToFetch} stranica iz Mobile.de API...`);

    // Uvek pozivamo stranice 1-5 da dohvatimo maksimalno različitih automobila
    let allCars = [];
    let totalCount = 0;
    
    for (let currentPageNum = 1; currentPageNum <= maxPagesToFetch && allCars.length < 100; currentPageNum++) {
      const currentApiParams = {
        ...apiParams,
        pageNumber: currentPageNum
      };
      
      const queryString = new URLSearchParams(currentApiParams).toString();
      const apiUrl = `${MOBILE_API_CONFIG.baseURL}?imageCount.min=1&${queryString}`;

      console.log(`📡 Pozivam stranicu ${currentPageNum}/${maxPagesToFetch}: ${apiUrl}`);

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
        console.log(`⚠️ Stranica ${currentPageNum} nije uspešna, preskoće se`);
        continue;
      }

      const pageData = response.data;
      if (pageData.ads && Array.isArray(pageData.ads)) {
        allCars.push(...pageData.ads);
        totalCount = pageData.total || pageData.totalCount || totalCount;
        console.log(`✅ Stranica ${currentPageNum}: ${pageData.ads.length} automobila`);
      }
      
      // Prekini ako nema više rezultata
      if (!pageData.ads || pageData.ads.length === 0) {
        console.log(`🛑 Nema više rezultata na stranici ${currentPageNum}`);
        break;
      }
    }

    // Ograniči rezultate na maksimalno 100 (ali vrati sve dohvaćene)
    const cars = allCars.slice(0, Math.min(requestedPageSize, 100));
    
    console.log(`🎯 Ukupno dohvaćeno: ${allCars.length} automobila, vraćam: ${cars.length}`);

    console.log("Prvi automobil od dohvaćenih:")
    console.log(cars[0])

    const total = totalCount || cars.length;

    console.log(`🚗 Šaljem ${cars.length} automobila od ukupno ${total} (requestedPageSize: ${requestedPageSize})`);

    // Process response data
    const responseData = {
      success: true,
      total,
      currentPage: pageNumber,
      pageSize: requestedPageSize,
      maxPages: Math.ceil(total / requestedPageSize),
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

// Endpoint za 6 najskupljih automobila
export const topExpensiveCars = async (req, res) => {
  const startTime = Date.now();
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    // Očisti expired cache unose
    clearExpiredCache();

    // Generiraj special cache key za top expensive cars
    const cacheKey = 'top_expensive_cars_6';
    
    // Provjeri cache prvo
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
      const responseTime = Date.now() - startTime;
      console.log(`⚡ Cache response za najskuplje automobile u ${responseTime}ms`);
      
      return res.status(200).json({
        ...cachedResult,
        cached: true,
        responseTime,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`🔍 Cache MISS - dohvaćam najskuplje automobile iz Mobile.de API...`);

    // API parametri za najskuplje automobile - sortiranje po cijeni opadajuće
    const apiParams = {
      pageNumber: 1,
      pageSize: 50, // Dohvaćamo više automobila da možemo sortirati
      damageUnrepaired: false,
      isBartered: false,
      lang: 'de',
      'sortOption.option': 'PRICE',
      'sortOption.order': 'DESCENDING'
    };

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
        console.log(`📡 API Aufruf für najskuplje (Versuch ${attempts}): ${apiUrl}`);
        
        response = await axios.get(apiUrl, {
          headers: MOBILE_API_CONFIG.headers,
          timeout: MOBILE_API_CONFIG.timeout,
          validateStatus: (status) => status >= 200 && status < 500
        });

        if (response.status === 200) {
          console.log('✅ Mobile.de API response erhalten für najskuplje');
          break;
        }
        
        if (attempts === maxAttempts) {
          throw new Error(`API returned status ${response.status}`);
        }
        
      } catch (error) {
        console.error(`❌ API Fehler (Versuch ${attempts}):`, error.message);
        
        if (attempts === maxAttempts) {
          throw error;
        }
        
        // Exponentieller Backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    if (!response || response.status !== 200) {
      throw new Error('Failed to fetch data from Mobile.de API');
    }

    const apiData = response.data;
    console.log(`📊 Najskuplje automobile - ukupno pronađeno: ${apiData.ads?.length || 0}`);

    // Process and clean the car data first - koristimo istu strukturu kao u glavnom endpointu
    let processedCars = (apiData.ads || []).map(ad => ({
      id: ad.mobileAdId || ad.id,
      mobileAdId: ad.mobileAdId || ad.id,
      make: ad.make || 'Unbekannt',
      model: ad.model || 'Unbekannt',
      year: ad.firstRegistration ? 
        new Date(ad.firstRegistration.toString().length === 6 ? 
          `${ad.firstRegistration.substr(0,4)}-${ad.firstRegistration.substr(4,2)}-01` : 
          ad.firstRegistration).getFullYear() : null,
      price: ad.price ? {
        value: parseFloat(ad.price.consumerPriceGross || ad.price.value),
        consumerPriceGross: parseFloat(ad.price.consumerPriceGross || ad.price.value),
        currency: ad.price.currency || 'EUR'
      } : null,
      mileage: ad.mileage || 0,
      fuel: ad.fuel || 'Unbekannt',
      gearbox: ad.gearbox || 'Unbekannt',
      power: ad.power || 0,
      condition: ad.condition || 'Unbekannt',
      images: ad.images ? ad.images.map((img, index) => ({
        id: index + 1,
        url: img.xxxl || img.xxl || img.xl || img.l || img.m || img.s || img.icon,
        alt: `${ad.make || 'Auto'} ${ad.model || 'Modell'} - Bild ${index + 1}`
      })) : [],
      description: ad.description || ad.plainTextDescription || '',
      plainTextDescription: ad.plainTextDescription || '',
      
      // Dodatne specifikacije
      cubicCapacity: ad.cubicCapacity,
      doors: ad.doors,
      seats: ad.seats,
      driveType: ad.driveType,
      exteriorColor: ad.exteriorColor,
      interiorColor: ad.interiorColor,
      
      // API meta podaci
      source: 'mobile.de',
      category: 'top-expensive',
      lastUpdated: new Date().toISOString()
    }));

    // Sortiraj po cijeni (opadajuće) i uzmi samo 6 najskupljih
    processedCars = processedCars
      .filter(car => car.price && car.price.value > 0) // Filtriraj automobile bez cijene
      .sort((a, b) => (b.price?.value || 0) - (a.price?.value || 0)) // Sortiraj po cijeni opadajuće
      .slice(0, 6); // Uzmi samo 6 najskupljih

    console.log(`💎 Top 6 najskupljih automobila (${processedCars.map(car => `${car.make} ${car.model}: ${car.price?.value}€`).join(', ')})`);

    const result = {
      success: true,
      cars: processedCars,
      total: processedCars.length,
      category: 'najskupljih-6',
      apiSource: 'mobile.de',
      lastUpdate: new Date().toISOString()
    };

    // Cache rezultat
    setCachedData(cacheKey, result);

    const responseTime = Date.now() - startTime;
    console.log(`✅ Najskuplje automobile uspješno obrađeni u ${responseTime}ms`);

    res.status(200).json({
      ...result,
      cached: false,
      responseTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('❌ Greška pri dohvaćanju najskupljih automobila:', error);
    
    // Fallback response
    res.status(500).json({
      success: false,
      cars: [],
      total: 0,
      category: 'najskupljih-6',
      error: error.message || 'Neočekivana greška pri dohvaćanju podataka',
      responseTime,
      timestamp: new Date().toISOString()
    });
  }
};