

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/sections/Hero';
import Brands from './components/sections/Brands';
import BuyingProcess from './components/sections/buycar';
import Cars from './components/sections/Cars';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import CarDetails from './pages/CarDetails';
import CarsPage from './pages/CarsPage';
import BuyCarPage from './pages/buycarpage';
import WhyChooseUs from './components/sections/WhyChooseUs';
import VideosSection from './components/sections/Videos';

function App() {
  return (
    
 
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-neutral-900 text-white">
            <Header />
            <Hero />
<VideosSection />
            <Cars />
            <Brands />
            <BuyingProcess />
            <WhyChooseUs />

            <Contact />
            <Footer />
          </div>
        } />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/kako-kupiti" element={<BuyCarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
