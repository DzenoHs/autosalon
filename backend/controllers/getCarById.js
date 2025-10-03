import { fetchCarById } from '../utils/mobileAPI.js';
import { generateCacheKey, getCachedData, setCachedData, clearExpiredCache } from '../utils/cache.js';

export const getCarById = async (req, res) => {
  const startTime = Date.now();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    clearExpiredCache();

    const carId = req.params.id;
    if (!carId) {
      return res.status(400).json({ success: false, error: 'Car ID is required' });
    }

    const cacheKey = generateCacheKey(`car_${carId}`);
    const cachedResult = getCachedData(cacheKey);

    if (cachedResult) {
      return res.status(200).json({
        success: true,
        car: cachedResult,
        cached: true,
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      });
    }

    const carData = await fetchCarById(carId);
    setCachedData(cacheKey, carData);

    res.status(200).json({
      success: true,
      car: carData,
      cached: false,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Error fetching car by ID:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Unexpected error',
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }
};