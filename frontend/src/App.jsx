

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import Cars from './components/sections/Cars';
import BuyCar from './components/sections/buycar';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Contact from './components/sections/Contact';
import CarDetails from './pages/CarDetails';
import CarsPage from './pages/CarsPage';
import BuyCarPage from './pages/buycarpage';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import DesktopSlideshow from './components/DesktopSlideshow';
import { CarsProvider } from './context/CarsContext';
import { SlideshowProvider } from './context/SlideshowContext';

function App() {
  return (
    <CarsProvider>
      <SlideshowProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <DesktopSlideshow>
                <Hero />
                <Cars />
                <BuyCar />
                <WhyChooseUs />
                <Contact />
                <Footer />
              </DesktopSlideshow>
            } />
            <Route path="/cars" element={
              <>
                <CarsPage />
                <Footer />
              </>
            } />
            <Route path="/car/:id" element={
              <>
                <CarDetails />
                <Footer />
              </>
            } />
            <Route path="/kako-kupiti" element={
              <>
                <BuyCarPage />
                <Footer />
              </>
            } />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </Router>
      </SlideshowProvider>
    </CarsProvider>
  );
}

export default App;
