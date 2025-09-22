import { clearExpiredCache, generateCacheKey, getCachedData, setCachedData } from '../utils/cache.js';
import { fetchCarsFromMobileAPI } from '../utils/mobileAPI.js';

// Endpoint to fetch cars
export const cars = async (req, res) => {
  const startTime = Date.now();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    clearExpiredCache();

    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const requestedPageSize = Math.min(parseInt(req.query.pageSize) || 20, 20);

    const apiParams = {
      'page.number': pageNumber,
      'page.size': requestedPageSize, // Mobile.de API returns max 20 cars per page
      lang: 'de',
      ...(req.query.make && req.query.model
        ? { "classification": `refdata/classes/Car/makes/${req.query.make}/models/${req.query.model}` }
        : req.query.make
          ? { "classification": `refdata/classes/Car/makes/${req.query.make}` }
          : {}),
      ...(req.query.priceFrom && { 'price.min': req.query.priceFrom }),
      ...(req.query.priceTo && { 'price.max': req.query.priceTo }),
      ...(req.query.yearFrom && { "firstRegistrationDate.min": `${req.query.yearFrom}-01` }),
      ...(req.query.yearTo && { "firstRegistrationDate.max": `${req.query.yearTo}-12` }),
      ...(req.query.fuel && { fuel: req.query.fuel }),
      ...(req.query.gearbox && { gearbox: req.query.gearbox }),
    };

    const cacheKey = generateCacheKey(apiParams);
    const cachedResult = getCachedData(cacheKey);

    if (cachedResult) {
      return res.status(200).json({
        ...cachedResult,
        cached: true,
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      });
    }

    const { allCars, totalCount } = await fetchCarsFromMobileAPI(apiParams, 5); // Fetch up to 5 pages
    const cars = allCars.slice(0, requestedPageSize);

    const responseData = {
      success: true,
      total: totalCount || cars.length,
      currentPage: pageNumber,
      pageSize: requestedPageSize,
      maxPages: Math.ceil((totalCount || cars.length) / requestedPageSize),
      ads: cars,
      cached: false,
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
    };

    setCachedData(cacheKey, responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error('❌ Error in cars API:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
};