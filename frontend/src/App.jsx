

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
import CarMessage from './pages/CarMessage';
import WhyChooseUs from './components/sections/WhyChooseUs';
import VideosSection from './components/sections/Videos';
import Datenschutzerklarung from './pages/Datenschutzerklarung';
import Impressum from './pages/Impressum';
import CookiePolicy from './pages/CookiePolicy';
import { CookieConsentProvider } from './hooks/useCookieConsent.jsx';
import CookieBanner from './components/cookies/CookieBanner';
import CookieFloatingButton from './components/cookies/CookieFloatingButton';

function App() {
  return (
    <CookieConsentProvider>
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
        <Route path="/car-message/:carId" element={<CarMessage />} />
        <Route path="/kako-kupiti" element={<BuyCarPage />} />
  <Route path="/datenschutzerklarung" element={<Datenschutzerklarung />} />
  <Route path="/impressum" element={<Impressum />} />
  <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      
      {/* Global Cookie Components */}
      <CookieBanner />
      <CookieFloatingButton />
    </Router>
    </CookieConsentProvider>
  );
}

export default App;
