import express from 'express';
import cors from 'cors';
import { cars } from './controllers/cars.js';
// import { checkRateLimit } from './rateLimiter.js';
import { getCarById } from './controllers/getCarById.js';
import { topExpensiveCars } from './controllers/topExpensiveCars.js';
import { clearCache, getCacheStats } from './utils/cache.js';
import morgan from 'morgan';
import { getCarsFuel, getCarsGearbox, getCarsMake, getCarsModels } from './controllers/filters.js';

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
app.use(morgan('dev'))

// OPTIONS handler
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.status(200).json({ success: true, message: 'CORS preflight OK' });
});

//Basic Rate limit
// checkRateLimit()

app.get('/', (req, res) => {
  res.status(200).send('Backend is running!!!');
});

// Main API endpoints
app.get("/api/cars", cars);
app.get("/api/cars/make", getCarsMake)
app.get("/api/cars/models", getCarsModels)
app.get("/api/cars/gearbox", getCarsGearbox)
app.get("/api/cars/fuel", getCarsFuel)
app.get("/api/cars/top/expensive", topExpensiveCars);
app.get("/api/cars/:id", getCarById);

// Cache management endpoints
app.get("/api/cache/stats", getCacheStats);
app.delete("/api/cache/clear", clearCache);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "AutoSalon API Server is running with caching enabled"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AutoSalon API Server pokrenut na http://localhost:${PORT}`);
  console.log(`📊 Cache Stats: http://localhost:${PORT}/api/cache/stats`);
  console.log(`🧹 Cache Clear: DELETE http://localhost:${PORT}/api/cache/clear`);
});