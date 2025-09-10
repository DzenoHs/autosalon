import axios from 'axios';

const MOBILE_API_CONFIG = {
  baseURL: 'https://services.sandbox.mobile.de/search-api/ad/',
  headers: {
    'Authorization': 'Basic c2VhcmNoLWdlbmVyaWM6c2VhcmNoLWdlbmVyaWM=',
    'Accept': 'application/vnd.de.mobile.api+json',
    'User-Agent': 'AutoSalon-Proxy/1.0',
    'Content-Type': 'application/json'
  },
  timeout: 15000
};

export const getCarById = async (req, res) => {
  const id = req.params.id || null

  const apiUrl = `${MOBILE_API_CONFIG.baseURL}${id}`

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

  res.json(apiData)
}