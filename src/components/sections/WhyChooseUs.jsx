import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, CreditCard, Zap } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle size={48} />,
    emoji: '✅',
    title: 'Garantie',
    description: 'Alle Fahrzeuge kommen mit einer erweiterten Garantie von bis zu 5 Jahren',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: <Shield size={48} />,
    emoji: '🛠',
    title: 'Geprüft',
    description: 'Jedes Auto durchläuft eine detaillierte technische Inspektion',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: <CreditCard size={48} />,
    emoji: '💳',
    title: 'Finanzierung',
    description: 'Flexible Zahlungspläne, angepasst an Ihre Bedürfnisse',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    icon: <Zap size={48} />,
    emoji: '🚀',
    title: 'Schnelle Lieferung',
    description: 'Express-Lieferung Ihres neuen Autos in maximal 48 Stunden',
    gradient: 'from-orange-500 to-red-600'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-neutral-900 via-black to-neutral-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              WARUM WIR?
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Više od 15 godina iskustva u pružanju premium usluga našim klijentima
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                   style={{background: `linear-gradient(135deg, var(--tw-gradient-stops))`}}
              ></div>
              
              <div className={`relative bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-8 rounded-2xl border border-neutral-700 group-hover:border-transparent transition-all duration-500 shadow-2xl`}>
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-6xl mb-4 animate-bounce">{feature.emoji}</div>
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>

                {/* Glowing effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-neutral-700"
        >
          {[
            { number: '500+', label: 'Zadovoljnih klijenata' },
            { number: '15+', label: 'Godina iskustva' },
            { number: '400+', label: 'Fahrzeuge im Angebot' },
            { number: '24/7', label: 'Podrška' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
