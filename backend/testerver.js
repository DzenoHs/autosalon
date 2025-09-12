// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5003;

// Ovde unesi API username i password koje si dobio od Mobile.de
const API_USERNAME = 'REMOVED';
const API_PASSWORD = 'REMOVED';

// Funkcija koja kodira korisničko ime i lozinku u base64 Basic Auth header
function getAuthHeader() {
  const token = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
  return `Basic ${token}`;
}
app.get('/api/sellers', async (req, res) => {
  try {
    const response = await axios.get(
      'https://services.mobile.de/seller-api/sellers',
      {
        headers: {
          'Authorization': getAuthHeader(),
          'Accept': 'application/vnd.de.mobile.api+json',
          'User-Agent': 'AutoSalon-Proxy/1.0',
        },
      }
    );

    if (response.status === 200) {
      res.json({
        success: true,
        sellers: response.data || [],
      });
    } else {
      res.status(response.status).json({
        success: false,
        message: 'API error kod dohvata seller-a',
      });
    }
  } catch (error) {
    console.error('Greška kod dohvata seller-a:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      message: 'Greška kod dohvata seller-a',
      error: error.response ? error.response.data : error.message,
    });
  }
});


// Omogućava CORS za sve izvore (možeš ograničiti ako želiš)
app.use(cors());
app.use(express.json());

// Proxy endpoint za dohvat oglasa prodavca preko Seller API-ja
// Potrebno je poslati sellerId kao parametar rute
app.get('/api/sellers/:sellerId/ads', async (req, res) => {
  const sellerId = req.params.sellerId;

  try {
    const response = await axios.get(
      `https://services.mobile.de/seller-api/sellers/${sellerId}/ads`,
      {
        headers: {
          'Authorization': getAuthHeader(),
          'Accept': 'application/vnd.de.mobile.api+json',
          'User-Agent': 'AutoSalon-Proxy/1.0',
        },
      }
    );

    if (response.status === 200) {
      res.json({
        success: true,
        ads: response.data.ads || [],
      });
    } else {
      res.status(response.status).json({
        success: false,
        message: 'API error',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Endpoint za health check servera
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
  console.log('Unesi svoje Mobile.de API korisničko ime i lozinku u server.js fajlu.');
  console.log('Pozovi GET /api/sellers/:sellerId/ads za učitavanje oglasa.');
});
