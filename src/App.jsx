

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Cars from './components/sections/Cars';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import CarDetails from './pages/CarDetails';
import CarsPage from './pages/CarsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-neutral-900 text-white">
            <Header />
            <Hero />
            <About />
            <Cars />
            <Services />
            <Contact />
            <Footer />
          </div>
        } />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
