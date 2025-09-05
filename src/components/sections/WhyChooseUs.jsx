import React from 'react';
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
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-green-500 rounded-full animate-ping opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
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
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-8 rounded-full"
          ></motion.div>
          
          <motion.p 
            className="text-gray-300 text-2xl max-w-4xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Über 15 Jahre Erfahrung in Premium-Automobildienstleistungen
            </span>
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative perspective-1000"
            >
              {/* Glowing background effect */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 animate-pulse`}></div>
              
              {/* Main card */}
              <div className={`relative bg-gradient-to-br from-neutral-900 via-black to-neutral-800 p-8 rounded-3xl border-2 border-neutral-700 group-hover:border-transparent transition-all duration-500 ${feature.shadowColor} shadow-2xl group-hover:shadow-3xl backdrop-blur-sm`}>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.gradient} opacity-10 rounded-tr-3xl rounded-bl-full`}></div>
                
                <div className="text-center relative z-10">
                  {/* Icon section */}
                  <div className="mb-8">
                    <motion.div 
                      className="text-7xl mb-6 filter drop-shadow-lg"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.6 }
                      }}
                    >
                      {feature.emoji}
                    </motion.div>
                    
                    <motion.div 
                      className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-white drop-shadow-lg">
                        {feature.icon}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-3xl font-black text-white mb-6 tracking-wider group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-gray-200 group-hover:to-white group-hover:bg-clip-text transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-200 transition-all duration-500 font-medium">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-1 bg-gradient-to-r ${feature.gradient} transition-all duration-700 rounded-full`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section with brutal styling */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-28 pt-20 border-t-2 border-gradient-to-r border-neutral-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: '500+', label: 'ZUFRIEDENE KUNDEN', icon: <Users size={32} />, color: 'from-green-400 to-emerald-600' },
              { number: '15+', label: 'JAHRE ERFAHRUNG', icon: <Award size={32} />, color: 'from-blue-400 to-cyan-600' },
              { number: '400+', label: 'FAHRZEUGE', icon: <Car size={32} />, color: 'from-purple-400 to-pink-600' },
              { number: '24/7', label: 'SUPPORT', icon: <Clock size={32} />, color: 'from-orange-400 to-red-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200 
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </motion.div>
                
                <motion.div 
                  className={`text-5xl md:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 leading-none`}
                  whileHover={{ 
                    textShadow: "0 0 20px rgba(255,255,255,0.5)" 
                  }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-gray-400 group-hover:text-white transition-colors duration-300 text-lg font-bold tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
