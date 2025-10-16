import React, {Suspense, lazy} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import {CookieConsentProvider} from './hooks/useCookieConsent.jsx'
import CookieBanner from './components/cookies/CookieBanner'
import CookieFloatingButton from './components/cookies/CookieFloatingButton'

// Lazy-loaded heavy/route components
const Hero = lazy(() => import('./components/sections/Hero'))
const Brands = lazy(() => import('./components/sections/Brands'))
const BuyingProcess = lazy(() => import('./components/sections/buycar'))
const Cars = lazy(() => import('./components/sections/Cars'))
const Contact = lazy(() => import('./components/sections/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const CarDetails = lazy(() => import('./pages/CarDetails'))
const CarsPage = lazy(() => import('./pages/CarsPage'))
const BuyCarPage = lazy(() => import('./pages/buycarpage'))
const TradeInPage = lazy(() => import('./pages/TradeInPage'))
const WhyChooseUs = lazy(() => import('./components/sections/WhyChooseUs'))
const VideosSection = lazy(() => import('./components/sections/Videos'))
const Datenschutzerklarung = lazy(() => import('./pages/Datenschutzerklarung'))
const Impressum = lazy(() => import('./pages/Impressum'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))

function App() {
  return (
    <CookieConsentProvider>
      <Router>
        <Suspense fallback={<div className="text-center text-white p-10">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/trade-in/:id" element={<TradeInPage />} />
            <Route path="/kako-kupiti" element={<BuyCarPage />} />
            <Route path="/datenschutzerklarung" element={<Datenschutzerklarung />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
        </Suspense>
        {/* Global Cookie Components */}
        <CookieBanner />
        <CookieFloatingButton />
      </Router>
    </CookieConsentProvider>
  )
}

export default App
