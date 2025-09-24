import React, {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

import autokuca1 from '/assets/autokuca1.jpg'
import autokuca2 from '/assets/autokuca2.jpg'
import heroslika2 from '/assets/heroslika2.jpeg'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const images = [autokuca1, autokuca2, heroslika2]

  // Enhanced image preloading for iOS
  useEffect(() => {
    let loadedCount = 0
    const imagePromises = images.map((image) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          if (loadedCount === images.length) {
            setImagesLoaded(true)
          }
          resolve()
        }
        img.onerror = () => resolve()
        img.src = image
      })
    })
    
    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true)
    })
  }, [])

  // Delayed start for iOS stability
  useEffect(() => {
    if (!imagesLoaded) return

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 4000)

      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timeout)
  }, [images.length, imagesLoaded])

  // Don't render until images are loaded
  if (!imagesLoaded) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="text-white text-xl">Loading...</div>
      </section>
    )
  }

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
      style={{
        isolation: 'isolate', // Create stacking context
        willChange: 'auto' // Don't keep hardware acceleration active
      }}
    >
      {/* FIXED: Static Background Container - No Framer Motion */}
      <div 
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)', // Single hardware acceleration
          WebkitTransform: 'translate3d(0, 0, 0)',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d'
        }}
      >
        {/* Use AnimatePresence for smoother transitions */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex} // Force re-mount on change
            src={images[currentImageIndex]}
            alt={`Auto kuća ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut"
            }}
            style={{
              // CRITICAL: Remove hardware acceleration from individual images
              willChange: 'opacity', // Only animate opacity
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // Remove transform properties that cause flicker
              imageRendering: 'auto', // Let browser decide
              WebkitImageRendering: 'auto'
            }}
            loading="eager"
            decoding="async" // Changed from sync to async
          />
        </AnimatePresence>
        
        <div 
          className="absolute inset-0 bg-black/50 z-[1]"
          style={{
            // Static overlay - no animation properties
            pointerEvents: 'none'
          }}
        ></div>
      </div>

      {/* Content - Separate stacking context */}
      <div 
        className="relative z-10 text-center px-6"
        style={{
          isolation: 'isolate' // Separate rendering layer
        }}
      >
        <motion.div 
          initial={{opacity: 0, y: 50}} 
          animate={{opacity: 1, y: 0}} 
          transition={{duration: 1, delay: 0.5}}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              FINDEN SIE IHR
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              TRAUMAUTO
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, delay: 1}}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Premium-Fahrzeuge für diejenigen, die das Beste verdienen
        </motion.p>

        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, delay: 1.5}}
          className="flex flex-col sm:flex-row gap-6 justify-center px-4"
        >
          <button
            onClick={() => document.getElementById('cars')?.scrollIntoView({behavior: 'smooth'})}
            className="group relative bg-gradient-to-r from-red-500 to-red-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-red-500/25 w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10">Fahrzeuge ansehen</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            className="group relative border-2 border-red-500 bg-transparent px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 shadow-2xl hover:shadow-red-500/25 w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Kontaktieren Sie uns
            </span>
            <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </motion.div>
      </div>

      {/* Fixed Image Indicators - No Framer Motion */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex gap-3">
          {images.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? 'bg-red-500 w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              style={{
                WebkitTapHighlightColor: 'transparent',
                // Remove hardware acceleration from buttons
                transform: 'none',
                WebkitTransform: 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 2, duration: 1}}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>

      {/* iOS Safari Specific Fixes */}
      <style jsx>{`
        /* Disable hardware acceleration on static elements */
        section#hero * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Force consistent rendering */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          section#hero {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
        }
        
        /* Prevent iOS Safari from optimizing images */
        @supports (-webkit-appearance: none) {
          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: optimize-contrast;
          }
        }
      `}</style>
    </section>
  )
}
