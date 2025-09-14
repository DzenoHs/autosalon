const apiCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const MAX_CACHE_SIZE = 100; // Maximum 100 cache entries

// Generate a cache key based on the input parameters
export const generateCacheKey = (key) => {
  if (typeof key === 'object') {
    return JSON.stringify(
      Object.keys(key)
        .sort()
        .reduce((result, k) => ({ ...result, [k]: key[k] }), {})
    );
  }
  return key;
};

// Retrieve cached data if it exists and is not expired
export const getCachedData = (cacheKey) => {
  const cached = apiCache.get(cacheKey);
  if (!cached || Date.now() - cached.timestamp > CACHE_DURATION) {
    apiCache.delete(cacheKey);
    return null;
  }
  console.log(`🎯 Cache HIT for key: ${cacheKey}`);
  return cached.data;
};

// Save data to the cache
export const setCachedData = (cacheKey, data) => {
  if (apiCache.size >= MAX_CACHE_SIZE) {
    const firstKey = apiCache.keys().next().value;
    apiCache.delete(firstKey);
    console.log(`🧹 Removed oldest cache entry`);
  }
  apiCache.set(cacheKey, { data, timestamp: Date.now() });
  console.log(`💾 Cache SAVE for key: ${cacheKey}`);
};

// Clear expired cache entries
export const clearExpiredCache = () => {
  const now = Date.now();
  let removedCount = 0;
  for (const [key, value] of apiCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      apiCache.delete(key);
      removedCount++;
    }
  }
  if (removedCount > 0) console.log(`🧹 Cleared ${removedCount} expired cache entries`);
};

// Clear all cache entries
export const clearCache = (req, res) => {
  const previousSize = apiCache.size;
  apiCache.clear();
  console.log(`🧹 Cleared all cache entries (${previousSize} entries removed)`);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  res.status(200).json({
    success: true,
    message: `Cache cleared successfully. Removed ${previousSize} entries.`,
    previousSize,
    currentSize: apiCache.size,
    timestamp: new Date().toISOString(),
  });
};

// Get cache statistics
export const getCacheStats = (req, res) => {
  const now = Date.now();
  const activeEntries = [];
  let expiredCount = 0;

  for (const [key, value] of apiCache.entries()) {
    const age = now - value.timestamp;
    if (age > CACHE_DURATION) {
      expiredCount++;
    } else {
      activeEntries.push({
        key: key.substring(0, 100) + (key.length > 100 ? '...' : ''),
        age: Math.round(age / 1000),
        remainingTTL: Math.round((CACHE_DURATION - age) / 1000),
      });
    }
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  res.status(200).json({
    cacheSize: apiCache.size,
    maxCacheSize: MAX_CACHE_SIZE,
    activeEntries: activeEntries.length,
    expiredEntries: expiredCount,
    cacheDurationMinutes: CACHE_DURATION / (60 * 1000),
    entries: activeEntries,
    timestamp: new Date().toISOString(),
  });
};