import axios from 'axios';

// Load environment variables from .env file

const username = process.env.MOBILE_API_USERNAME;
const password = process.env.MOBILE_API_PASSWORD;


if (!username || !password) {
  throw new Error('MOBILE_API_USERNAME or MOBILE_API_PASSWORD is not defined in .env');
}

const MOBILE_API_CONFIG = {
  baseURL: 'https://services.mobile.de/',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    'Accept': 'application/vnd.de.mobile.api+json',
    'User-Agent': 'AutoSalon-Proxy/1.0',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
};

// Funkcija za dohvaćanje automobila sa Mobile.de API-ja
export const fetchCarsFromMobileAPI = async (apiParams, maxPagesToFetch = 5) => {
  let allCars = [];
  let totalCount = 0;
  const uniqueCarIds = new Set(); // Track unique car IDs to avoid duplicates

  for (let currentPageNum = 1; currentPageNum <= maxPagesToFetch && allCars.length < 100; currentPageNum++) {
    const currentApiParams = { ...apiParams, 'page.number': currentPageNum };
    const queryString = new URLSearchParams(currentApiParams).toString();
    const apiUrl = `${MOBILE_API_CONFIG.baseURL}search-api/search?imageCount.min=1&${queryString}`;

    console.log(`📡 Fetching page ${currentPageNum}/${maxPagesToFetch}: ${apiUrl}`);

    let response;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        response = await axios.get(apiUrl, {
          headers: MOBILE_API_CONFIG.headers,
          timeout: MOBILE_API_CONFIG.timeout,
          validateStatus: (status) => status >= 200 && status < 500,
        });

        if (response.status === 200) break;
        if (attempts === maxAttempts) throw new Error(`API returned status ${response.status}`);
      } catch (error) {
        if (attempts === maxAttempts) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
      }
    }

    if (!response || response.status !== 200) {
      console.log(`⚠️ Page ${currentPageNum} failed, skipping`);
      continue;
    }

    const pageData = response.data;

    if (pageData.ads && Array.isArray(pageData.ads)) {
      pageData.ads.forEach((ad) => {
        if (!uniqueCarIds.has(ad.id)) // Skip if the car ID already exists
          allCars.push(ad); // Add the car to the result array
      });

      totalCount = pageData.total || pageData.totalCount || totalCount;
      console.log(`✅ Page ${currentPageNum}: ${pageData.ads.length} cars (Unique: ${allCars.length})`);
    }

    if (!pageData.ads || pageData.ads.length === 0) {
      console.log(`🛑 No more results on page ${currentPageNum}`);
      break;
    }
  }

  return { allCars, totalCount };
};

// Funkcija za dohvaćanje najskupljih automobila
export const fetchTopExpensiveCars = async () => {
  const apiParams = {
    'page.number': 1,
    'page.size': 6,
    lang: 'de',
    'sort.field': 'price',
    'sort.order': 'DESCENDING'
  };

  const queryString = new URLSearchParams(apiParams).toString();
  const apiUrl = `${MOBILE_API_CONFIG.baseURL}search-api/search?imageCount.min=1&${queryString}`;

  let response;
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      console.log(`📡 Fetching top expensive cars (Attempt ${attempts}): ${apiUrl}`);
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
    throw new Error('Failed to fetch data from Mobile.de API');
  }

  return response.data.ads || [];
};

// Fetch car details by ID
export const fetchCarById = async (carId) => {
  const apiUrl = `${MOBILE_API_CONFIG.baseURL}search-api/ad/${carId}`;
  const response = await axios.get(apiUrl, {
    headers: MOBILE_API_CONFIG.headers,
    timeout: MOBILE_API_CONFIG.timeout,
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch car details (status: ${response.status})`);
  }

  return response.data;
};


export const fetchCarModels = async (make) => {
  if (!make) {
    throw new Error('Car make is required to fetch models');
  }

  const apiParams = {
    'page.number': 1,
    'page.size': 100, // Fetch up to 100 cars per page
    lang: 'de',
    classification: `refdata/classes/Car/makes/${make}`, // Filter by make
  };

  try {
    console.log(`📡 Fetching cars for make "${make}" to extract models`);
    const { allCars } = await fetchCarsFromMobileAPI(apiParams, 5); // Fetch up to 5 pages

    // Extract distinct models from the fetched cars
    const distinctModels = [...new Set(allCars.map((car) => car.model).filter(Boolean))];

    console.log(`✅ Found ${distinctModels.length} distinct models for make "${make}"`);
    return distinctModels;
  } catch (error) {
    console.error(`❌ Error fetching car models for make "${make}":`, error.message);
    throw new Error(`Failed to fetch car models for make "${make}": ${error.message}`);
  }
};