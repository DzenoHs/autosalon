import { fetchCarsFromMobileAPI, fetchCarModels } from "../utils/mobileAPI.js";
import { clearExpiredCache, generateCacheKey, getCachedData, setCachedData } from '../utils/cache.js';

export const getCarsMake = async (req, res) => {
  const startTime = Date.now();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    clearExpiredCache();

    const cacheKey = generateCacheKey({ endpoint: 'getCarsMake' });
    const cachedResult = getCachedData(cacheKey);

    if (cachedResult) {
      return res.status(200).json({
        cached: true,
        data: cachedResult,
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      });
    }

    const pageNumber = 1;
    const requestedPageSize = 300;

    const apiParams = {
      'page.number': pageNumber,
      'page.size': requestedPageSize,
    };

    const { allCars } = await fetchCarsFromMobileAPI(apiParams, 5);
    const distinctMakes = [...new Set(allCars.map(ad => ad.make))];

    setCachedData(cacheKey, distinctMakes);

    return res.status(200).json({
      cached: false,
      data: distinctMakes,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error in getCarsMake API:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
};

export const getCarsModels = async (req, res) => {
  const startTime = Date.now();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    clearExpiredCache();

    const make = req.query.make;

    if (!make) {
      return res.status(400).json({
        success: false,
        error: 'Car make is required',
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      });
    }

    const cacheKey = generateCacheKey({ endpoint: 'getCarsModels', make });
    const cachedResult = getCachedData(cacheKey);

    if (cachedResult) {
      return res.status(200).json({
        cached: true,
        data: cachedResult,
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      });
    }

    console.log(`📡 Fetching car models for make: ${make}`);
    const models = await fetchCarModels(make);

    setCachedData(cacheKey, models);

    return res.status(200).json({
      cached: false,
      data: models,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error in getCarsModels API:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
};