import axios from 'axios';

<<<<<<< HEAD
const username = process.env.MOBILE_DE_USERNAME || 'REMOVED';
const password = process.env.MOBILE_DE_PASSWORD || 'REMOVED';
=======
const username = process.env.MOBILE_DE_USERNAME || 'REMOVED';
const password = process.env.MOBILE_DE_PASSWORD || 'REMOVED';
>>>>>>> 8c4185e6223f6dd99adf9e21c02582ff4895fd92
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
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Missing car ID parameter'
      });
    }

    console.log(`🚗 Dohvaćam detalje za automobil ID: ${id}`);

    // Build API URL for single car details
    const apiUrl = `${MOBILE_API_CONFIG.baseURL}/${id}`;

    const response = await axios.get(apiUrl, {
      headers: MOBILE_API_CONFIG.headers,
      timeout: MOBILE_API_CONFIG.timeout,
    });

    if (response.status !== 200 || !response.data) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    // Format seller address for React rendering
    let formattedSeller = null;
    if (response.data.seller) {
      formattedSeller = {
        ...response.data.seller,
        address: formatAddress(response.data.seller.address)
      };
    }

    const carDetails = {
      ...response.data,
      seller: formattedSeller
    };

    console.log(`✅ Detalji automobila uspešno dohvaćeni`);

    res.status(200).json({
      success: true,
      car: carDetails,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Greška u car details API:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to format address
function formatAddress(address) {
  if (!address) return '';
  
  if (typeof address === 'string') {
    return address;
  }
  
  if (typeof address === 'object') {
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.zipCode) parts.push(address.zipCode);
    if (address.city) parts.push(address.city);
    if (address.country) parts.push(address.country);
    return parts.join(', ');
  }
  
  return '';
}
