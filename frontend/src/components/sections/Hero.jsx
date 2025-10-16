import React, {useState, useEffect} from 'react'

import heroVideo from '/assets/herovideo555.mp4'

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Video preloading
  useEffect(() => {
    const video = document.createElement('video')
    video.src = heroVideo
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      setVideoLoaded(true)
    }
  }, [])

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
          poster="/assets/slika1.jpeg"
          style={{ objectPosition: 'center' }}
          onLoadStart={() => console.log('Video loading started')}
          onLoadedMetadata={() => console.log('Video metadata loaded')}
          onCanPlay={() => console.log('Video can start playing')}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      </div>

      {/* Content - NO FRAMER MOTION */}
      <div className="relative z-10 text-center px-6 content-container">
        <div className="hero-content">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              FINDEN SIE IHR
            </span>
            <br />
            <span className="text-white">
              TRAUMAUTO
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Premium-Fahrzeuge für diejenigen, die das Beste verdienen
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
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
          </div>
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

      {/* CSS STYLES FOR VIDEO HERO */}
      <style jsx>{`
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

        /* Video optimizations */
        video {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
