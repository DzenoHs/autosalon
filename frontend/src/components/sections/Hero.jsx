import React, {useState, useEffect, useCallback, useMemo} from 'react'

import slika1 from '/assets/slika1.webp'
import slika2 from '/assets/slika2.webp'
import slika3 from '/assets/slika3.webp'

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const images = useMemo(() => [slika1, slika2, slika3], [])

  // Stable image preloading function
  const preloadImages = useCallback(() => {
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
  }, [images])

  useEffect(() => {
    preloadImages()
  }, [preloadImages])

  // Delayed start for iOS stability
  useEffect(() => {
    if (!imagesLoaded) return

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 4000)

      return () => clearInterval(interval)
    }, 1000) // Duži delay

    return () => clearTimeout(timeout)
  }, [images.length, imagesLoaded])

  // Memoized scroll handlers
  const scrollToCars = useCallback(() => {
    document.getElementById('cars')?.scrollIntoView({behavior: 'smooth'})
  }, [])

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})
  }, [])

  // Memoized indicator click handler
  const handleIndicatorClick = useCallback((index) => {
    setCurrentImageIndex(index)
  }, [])

  // Don't render until images are loaded
  if (!imagesLoaded) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="text-white text-xl">Loading...</div>
      </section>
    )
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* PURE CSS BACKGROUND SLIDESHOW - NO JAVASCRIPT ANIMATIONS */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={`bg-${index}`}
            className={`hero-slide ${currentImageIndex === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`
            }}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              style={{display: 'none'}}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
      </div>

      {/* Content - NO FRAMER MOTION */}
      <div className="relative z-10 text-center px-6 content-container">
        <div className="hero-content">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              FINDEN SIE IHR
            </span>
            <br />
            <span className="text-white">TRAUMAUTO</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Premium-Fahrzeuge für diejenigen, die das Beste verdienen
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
            <button
              onClick={scrollToCars}
              className="group relative bg-gradient-to-r from-red-500 to-red-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-red-500/25 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10">Fahrzeuge ansehen</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={scrollToContact}
              className="group relative border-2 border-red-500 bg-transparent px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 shadow-2xl hover:shadow-red-500/25 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Kontaktieren Sie uns
              </span>
              <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Simple Image Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex gap-3">
          {images.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => handleIndicatorClick(index)}
              className={`indicator-btn ${currentImageIndex === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 scroll-indicator">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* PURE CSS STYLES - NO JAVASCRIPT ANIMATIONS */}
      <style jsx>{`
        /* Background slideshow with pure CSS */
        .hero-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          /* iOS Safari optimizations */
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: opacity;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }

        .hero-slide.active {
          opacity: 1;
          z-index: 1;
        }

        /* Content fade-in animation */
        .content-container {
          animation: contentFadeIn 2s ease-out 0.5s both;
        }

        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Indicator buttons */
        .indicator-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          transform: none;
          -webkit-transform: none;
        }

        .indicator-btn:hover {
          background: rgba(255, 255, 255, 0.6);
        }

        .indicator-btn.active {
          background: #ef4444;
          width: 32px;
          border-radius: 6px;
        }

        /* iOS Safari specific fixes */
        @supports (-webkit-appearance: none) {
          .hero-slide {
            -webkit-background-size: cover;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
        }

        /* Disable hardware acceleration on mobile for stability */
        @media (max-width: 768px) {
          .hero-slide {
            will-change: auto;
            -webkit-transform: none;
            transform: none;
          }

          /* Faster transitions on mobile */
          .hero-slide {
            transition: opacity 0.8s ease-in-out;
          }
        }

        /* Force repainting fix for iOS */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          section#hero {
            -webkit-transform: translateZ(0);
          }
        }
      `}</style>
    </section>
  )
}

export default React.memo(Hero)
