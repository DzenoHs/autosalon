const express = require('express');
const cors = require('cors');
const { cars } = require('./cars');
const { checkRateLimit } = require('./rateLimiter');
const { getCarById } = require('./getCarById');

const app = express();
const PORT = process.env.PORT || 5003;

// CORS setup
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

app.use(cors(corsOptions));
app.use(express.json());

// OPTIONS handler
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.status(200).json({ success: true, message: 'CORS preflight OK' });
});

//Basic Rate limit
checkRateLimit()

app.get("/api/cars", cars)
app.get("/api/cars/:id", getCarById)

app.listen(PORT, () => { console.log(`🚀 AutoSalon API Server pokrenut na http://localhost:${PORT}`) });