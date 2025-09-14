import { fetchTopExpensiveCars } from '../utils/mobileAPI.js';
import { generateCacheKey, getCachedData, setCachedData, clearExpiredCache } from '../utils/cache.js';

export const topExpensiveCars = async (req, res) => {
  const startTime = Date.now();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    clearExpiredCache();

    const cacheKey = generateCacheKey('top_expensive_cars_6');
    const cachedResult = getCachedData(cacheKey);

    if (cachedResult) {
      return res.status(200).json({
        ...cachedResult,
        cached: true,
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      });
    }

    const ads = await fetchTopExpensiveCars();

    const result = {
      success: true,
      cars: ads,
      total: ads.length,
      category: 'top-expensive',
      apiSource: 'mobile.de',
      lastUpdate: new Date().toISOString(),
    };

    setCachedData(cacheKey, result);
    res.status(200).json({
      ...result,
      cached: false,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error fetching top expensive cars:', error);
    res.status(500).json({
      success: false,
      cars: [],
      total: 0,
      category: 'top-expensive',
      error: error.message || 'Unexpected error',
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
};