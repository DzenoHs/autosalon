import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, CreditCard, Zap, Car, Award, Clock, Users, Star } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle size={52} />,
    title: 'GARANTIE',
    description: 'Erweiterte Garantie  für maximale Sicherheit',
    gradient: 'from-emerald-400 via-green-500 to-emerald-700',
    shadowColor: 'shadow-emerald-500/25'
  },
  {
    icon: <Shield size={52} />,
    title: 'GEPRÜFT',
    description: 'Detaillierte technische Inspektion durch zertifizierte Experten',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-700',
    shadowColor: 'shadow-blue-500/25'
  },
  {
    icon: <CreditCard size={52} />,
    title: 'FINANZIERUNG',
    description: 'Flexible Zahlungspläne über SANTANDER und BANK11',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-700',
    shadowColor: 'shadow-purple-500/25'
  },
  {
    icon: <Zap size={52} />,
    title: 'EXPRESS',
    description: 'Expresse Kaufabwicklung in 48 Stunden',
    gradient: 'from-amber-400 via-orange-500 to-red-600',
    shadowColor: 'shadow-orange-500/25'
  }
];

export default function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <section 
     id="about"
    className="relative py-20 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-green-500 rounded-full animate-ping opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-none"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-white drop-shadow-2xl">
              WARUM
            </span>
            <span className="text-white ml-4">
              MIFTARI?
            </span>
          </motion.h2>

          {/* Mobile.de Rating - Premium Badge */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a 
              href="https://www.mobile.de/bewertungen/GM-TOP-CARS?showTotal=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow background effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 
                              rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Main container */}
              <div className="relative bg-gradient-to-br from-neutral-900/80 via-black/60 to-neutral-800/80 
                              backdrop-blur-md rounded-2xl border border-yellow-400/20 
                              px-8 py-4 shadow-2xl
                              group-hover:border-yellow-400/40 group-hover:shadow-yellow-400/10
                              transition-all duration-300">
                
                {/* Mobile.de logo text */}
                <div className="flex items-center justify-center mb-3">
                  <span className="text-yellow-400 text-sm font-bold tracking-wider">MOBILE.DE</span>
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mx-2"></div>
                  <span className="text-white/80 text-xs font-medium">ZERTIFIZIERT</span>
                </div>
                
                {/* Stars with enhanced glow */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      className="w-7 h-7 text-yellow-400 fill-yellow-400 
                                 drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-2xl
                                 transition-all duration-300"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.3))'
                      }}
                    />
                  ))}
                </div>
                
                {/* Rating info */}
                <div className="flex items-center justify-between text-center">
                  <div className="flex-1">
                    <div className="text-white font-bold text-lg">4.8</div>
                    <div className="text-yellow-400 text-xs font-medium">RATING</div>
                  </div>
                  
                  <div className="w-px h-8 bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"></div>
                  
                  <div className="flex-1">
                    <div className="text-white font-bold text-lg">299</div>
                    <div className="text-white/60 text-xs font-medium">BEWERTUNGEN</div>
                  </div>
                </div>
                
                {/* Call to action */}
                <div className="mt-3 pt-3 border-t border-yellow-400/20">
                  <div className="flex items-center justify-center gap-2 text-yellow-400 group-hover:text-yellow-300 
                                  transition-colors duration-300">
                    <span className="text-sm font-medium">Bewertungen ansehen</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Floating verification badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 
                              rounded-full p-1.5 shadow-lg transform rotate-12 
                              group-hover:rotate-0 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </motion.a>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-8 rounded-full"
          />
          
          <motion.p 
            className="text-white text-lg md:text-xl max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Über 30 Jahre Erfahrung in Premium-Automobildienstleistungen
            </span>
          </motion.p>
        </motion.div>

        {/* Cards Grid - CELA KARTICA MENJA BOJU */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Glowing Effect */}
              <motion.div 
                className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl`}
                animate={{ 
                  opacity: hoveredCard === index ? 0.4 : 0 
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Main Card - CELA KARTICA POSTAJE GRADIJENT */}
              <motion.div 
                className="relative p-5 lg:p-6 rounded-3xl border-2 transition-all duration-500 shadow-2xl backdrop-blur-sm min-h-[256px] lg:min-h-[288px]"
                animate={{
                  y: hoveredCard === index ? -12 : 0,
                  scale: hoveredCard === index ? 1.03 : 1,
                  rotateY: hoveredCard === index ? 8 : 0,
                  borderColor: hoveredCard === index ? 'transparent' : 'rgb(64 64 64)'
                }}
                style={{ 
                  transformOrigin: 'center center',
                  background: hoveredCard === index 
                    ? `linear-gradient(135deg, ${
                        feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399, #10b981, #047857' :
                        feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee, #3b82f6, #3730a3' :
                        feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa, #8b5cf6, #a21caf' :
                        '#fbbf24, #f97316, #dc2626'
                      })`
                    : 'linear-gradient(135deg, #171717, #000000, #262626)'
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                
                {/* Corner Accent - dinamički */}
                <div 
                  className="absolute top-0 right-0 w-13 lg:w-16 h-13 lg:h-16 rounded-tr-3xl rounded-bl-full"
                  style={{
                    background: hoveredCard === index ? 'rgba(255,255,255,0.1)' : `linear-gradient(-135deg, ${
                      feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399' :
                      feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee' :
                      feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa' :
                      '#fbbf24'
                    }, transparent)`,
                    opacity: hoveredCard === index ? 0.1 : 0.1
                  }}
                />
                
                <div className="text-center relative z-10 h-full flex flex-col justify-center">
                  {/* Icon Section */}
                  <div className="mb-5 lg:mb-6">
                    <motion.div 
                      className="inline-flex p-5 lg:p-6 rounded-2xl shadow-xl transition-shadow duration-300"
                      style={{
                        background: hoveredCard === index ? 'rgba(255,255,255,0.2)' : `linear-gradient(135deg, ${
                          feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399, #10b981' :
                          feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee, #3b82f6' :
                          feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa, #8b5cf6' :
                          '#fbbf24, #f97316'
                        })`
                      }}
                      animate={{
                        rotate: hoveredCard === index ? 360 : 0,
                        scale: hoveredCard === index ? 1.1 : 1
                      }}
                      transition={{ 
                        duration: 1.0,
                        ease: [0.68, -0.55, 0.265, 1.55]
                      }}
                    >
                      <div className="text-white drop-shadow-lg">
                        {React.cloneElement(feature.icon, { size: 42 })}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-base lg:text-2xl font-black mb-3 lg:mb-5 tracking-wider transition-all duration-400"
                    animate={{
                      scale: hoveredCard === index ? 1.05 : 1,
                      color: hoveredCard === index ? 'rgb(255 255 255)' : 'rgb(255 255 255)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p 
                    className="leading-relaxed text-xs lg:text-base font-medium transition-colors duration-400"
                    animate={{
                      color: hoveredCard === index ? 'rgb(243 244 246)' : 'rgb(156 163 175)'
                    }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - SPORIJA ROTACIJA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 lg:mt-28 pt-10 lg:pt-16 border-t-2 border-neutral-700"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {[
              { number: '6000+', label: 'ZUFRIEDENE KUNDEN', icon: <Users size={26} />, color: 'from-green-400 to-emerald-600' },
              { number: '30+', label: 'JAHRE ERFAHRUNG', icon: <Award size={26} />, color: 'from-blue-400 to-cyan-600' },
              { number: '150+', label: 'FAHRZEUGBESTAND', icon: <Car size={26} />, color: 'from-purple-400 to-pink-600' },
              { number: '24/7', label: 'E-MAIL SUPPORT', icon: <Clock size={26} />, color: 'from-orange-400 to-red-600' }
            ].map((stat, index) => (
              <motion.div
                key={index} 
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className="text-center cursor-pointer"
              >
                <motion.div 
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-3 shadow-lg transition-shadow duration-300`}
                  animate={{
                    rotate: hoveredStat === index ? 360 : 0,
                    scale: hoveredStat === index ? 1.15 : 1,
                    y: hoveredStat === index ? -8 : 0
                  }}
                  transition={{ 
                    duration: 1.2,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                >
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="text-3xl lg:text-5xl font-black text-white mb-2 leading-none transition-transform duration-300"
                  animate={{
                    scale: hoveredStat === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.number}
                </motion.div>
                
                <motion.div 
                  className="text-xs lg:text-base font-bold tracking-wider text-white transition-colors duration-300"
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
