import React from 'react'
import {motion} from 'framer-motion'
import heroMp4 from '../../../assets/herovideo.mp4'

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={heroMp4} type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <img
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1920&h=1080&fit=crop&crop=center"
            alt="Luxusauto Hintergrund"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} transition={{duration: 1, delay: 0.5}}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              FINDEN SIE IHR
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">TRAUMAUTO</span>
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 2, duration: 1}}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
