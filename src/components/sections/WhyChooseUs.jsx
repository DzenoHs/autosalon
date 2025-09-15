import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, CreditCard, Zap, Car, Award, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle size={52} />,
    emoji: '🔥',
    title: 'GARANTIE',
    description: 'Erweiterte Garantie bis zu 5 Jahren für maximale Sicherheit',
    gradient: 'from-emerald-400 via-green-500 to-emerald-700',
    shadowColor: 'shadow-emerald-500/25'
  },
  {
    icon: <Shield size={52} />,
    emoji: '⚡',
    title: 'GEPRÜFT',
    description: 'Detaillierte technische Inspektion durch zertifizierte Experten',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-700',
    shadowColor: 'shadow-blue-500/25'
  },
  {
    icon: <CreditCard size={52} />,
    emoji: '💎',
    title: 'FINANZIERUNG',
    description: 'Maßgeschneiderte Zahlungspläne für jeden Geldbeutel',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-700',
    shadowColor: 'shadow-purple-500/25'
  },
  {
    icon: <Zap size={52} />,
    emoji: '🚀',
    title: 'EXPRESS',
    description: 'Blitzschnelle Lieferung in maximal 48 Stunden',
    gradient: 'from-amber-400 via-orange-500 to-red-600',
    shadowColor: 'shadow-orange-500/25'
  }
];

export default function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
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
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              WARUM
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
              MIFTARI?
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-8 rounded-full"
          />
          
          <motion.p 
            className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Über 15 Jahre Erfahrung in Premium-Automobildienstleistungen
            </span>
          </motion.p>
        </motion.div>

        {/* Cards Grid - CELA KARTICA MENJA BOJU */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                className="relative p-6 lg:p-8 rounded-3xl border-2 transition-all duration-500 shadow-2xl backdrop-blur-sm min-h-[320px] lg:min-h-[360px]"
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
                  className="absolute top-0 right-0 w-16 lg:w-20 h-16 lg:h-20 rounded-tr-3xl rounded-bl-full"
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
                  {/* Icon Section - SPORIJA ROTACIJA */}
                  <div className="mb-6 lg:mb-8">
                    <motion.div 
                      className="text-5xl lg:text-7xl mb-4 lg:mb-6 filter drop-shadow-lg"
                      animate={{ 
                        scale: hoveredCard === index ? 1.2 : 1,
                        rotate: hoveredCard === index ? [0, -10, 10, -5, 5, 0] : 0
                      }}
                      transition={{ 
                        duration: hoveredCard === index ? 1.2 : 0.4,
                        ease: [0.68, -0.55, 0.265, 1.55]
                      }}
                    >
                      {feature.emoji}
                    </motion.div>
                    
                    <motion.div 
                      className="inline-flex p-4 lg:p-5 rounded-2xl shadow-xl transition-shadow duration-300"
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
                        <div className="lg:hidden">
                          {React.cloneElement(feature.icon, { size: 32 })}
                        </div>
                        <div className="hidden lg:block">
                          {feature.icon}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-lg lg:text-3xl font-black mb-4 lg:mb-6 tracking-wider transition-all duration-400"
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
                    className="leading-relaxed text-sm lg:text-lg font-medium transition-colors duration-400"
                    animate={{
                      color: hoveredCard === index ? 'rgb(243 244 246)' : 'rgb(156 163 175)'
                    }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Bottom Accent Line */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
                  style={{
                    background: hoveredCard === index ? 'rgba(255,255,255,0.3)' : `linear-gradient(90deg, ${
                      feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399, #10b981' :
                      feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee, #3b82f6' :
                      feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa, #8b5cf6' :
                      '#fbbf24, #f97316'
                    })`
                  }}
                  animate={{ 
                    width: hoveredCard === index ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.6 }}
                />
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
          className="mt-20 lg:mt-28 pt-16 lg:pt-20 border-t-2 border-neutral-700"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: '500+', label: 'ZUFRIEDENE KUNDEN', icon: <Users size={32} />, color: 'from-green-400 to-emerald-600' },
              { number: '15+', label: 'JAHRE ERFAHRUNG', icon: <Award size={32} />, color: 'from-blue-400 to-cyan-600' },
              { number: '400+', label: 'FAHRZEUGE', icon: <Car size={32} />, color: 'from-purple-400 to-pink-600' },
              { number: '24/7', label: 'SUPPORT', icon: <Clock size={32} />, color: 'from-orange-400 to-red-600' }
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
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg transition-shadow duration-300`}
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
                  className={`text-4xl lg:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 leading-none transition-transform duration-300`}
                  animate={{
                    scale: hoveredStat === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.number}
                </motion.div>
                
                <motion.div 
                  className="text-sm lg:text-lg font-bold tracking-wider transition-colors duration-300"
                  animate={{
                    color: hoveredStat === index ? 'rgb(255 255 255)' : 'rgb(156 163 175)'
                  }}
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
