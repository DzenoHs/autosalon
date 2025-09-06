import React, { useState } from 'react';
import { Shield, CheckCircle, CreditCard, Zap, Car, Award, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle size={52} />,
    title: 'GARANTIE',
    description: 'Erweiterte Garantie bis zu 5 Jahren für maximale Sicherheit',
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
    description: 'Maßgeschneiderte Zahlungspläne für jeden Geldbeutel',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-700',
    shadowColor: 'shadow-purple-500/25'
  },
  {
    icon: <Zap size={52} />,
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
      {/* Background particles - optimizovano */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-500 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-green-500 rounded-full opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              WARUM
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
              MIFTARI?
            </span>
          </h2>
          
          <div className="h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-8 rounded-full w-48" />
          
          <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto font-medium">
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Über 15 Jahre Erfahrung in Premium-Automobildienstleistungen
            </span>
          </p>
        </div>

        {/* Cards Grid - SAMO ROTIRAJUĆE IKONE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative cursor-pointer transform transition-all duration-300 hover:-translate-y-3 hover:scale-105"
            >
              {/* Glowing Effect */}
              <div 
                className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl transition-opacity duration-300 ${hoveredCard === index ? 'opacity-40' : 'opacity-0'}`}
              />
              
              {/* Main Card */}
              <div 
                className="relative p-6 lg:p-8 rounded-3xl border-2 transition-all duration-300 shadow-2xl backdrop-blur-sm min-h-[320px] lg:min-h-[360px]"
                style={{ 
                  borderColor: hoveredCard === index ? 'transparent' : 'rgb(64 64 64)',
                  background: hoveredCard === index 
                    ? `linear-gradient(135deg, ${
                        feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399, #10b981, #047857' :
                        feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee, #3b82f6, #3730a3' :
                        feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa, #8b5cf6, #a21caf' :
                        '#fbbf24, #f97316, #dc2626'
                      })`
                    : 'linear-gradient(135deg, #171717, #000000, #262626)'
                }}
              >
                
                {/* Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-16 lg:w-20 h-16 lg:h-20 rounded-tr-3xl rounded-bl-full opacity-10"
                  style={{
                    background: hoveredCard === index ? 'rgba(255,255,255,0.1)' : `linear-gradient(-135deg, ${
                      feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399' :
                      feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee' :
                      feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa' :
                      '#fbbf24'
                    }, transparent)`
                  }}
                />
                
                <div className="text-center relative z-10 h-full flex flex-col justify-center">
                  {/* SAMO ROTIRAJUĆA IKONA - bez emoji vatru */}
                  <div className="mb-6 lg:mb-8">
                    <div 
                      className="inline-flex p-4 lg:p-5 rounded-2xl shadow-xl transition-all duration-500"
                      style={{
                        background: hoveredCard === index ? 'rgba(255,255,255,0.2)' : `linear-gradient(135deg, ${
                          feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399, #10b981' :
                          feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee, #3b82f6' :
                          feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa, #8b5cf6' :
                          '#fbbf24, #f97316'
                        })`,
                        transform: hoveredCard === index ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)'
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
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-lg lg:text-3xl font-black mb-4 lg:mb-6 tracking-wider transition-all duration-300"
                    style={{
                      transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                      color: 'rgb(255 255 255)'
                    }}
                  >
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    className="leading-relaxed text-sm lg:text-lg font-medium transition-colors duration-300"
                    style={{
                      color: hoveredCard === index ? 'rgb(243 244 246)' : 'rgb(156 163 175)'
                    }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-300"
                  style={{
                    width: hoveredCard === index ? '100%' : '0%',
                    background: hoveredCard === index ? 'rgba(255,255,255,0.3)' : `linear-gradient(90deg, ${
                      feature.gradient === 'from-emerald-400 via-green-500 to-emerald-700' ? '#34d399, #10b981' :
                      feature.gradient === 'from-cyan-400 via-blue-500 to-indigo-700' ? '#22d3ee, #3b82f6' :
                      feature.gradient === 'from-violet-400 via-purple-500 to-fuchsia-700' ? '#a78bfa, #8b5cf6' :
                      '#fbbf24, #f97316'
                    })`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - ZADRŽAO ROTIRAJUĆE IKONE */}
        <div className="mt-20 lg:mt-28 pt-16 lg:pt-20 border-t-2 border-neutral-700">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: '500+', label: 'ZUFRIEDENE KUNDEN', icon: <Users size={32} />, color: 'from-green-400 to-emerald-600' },
              { number: '15+', label: 'JAHRE ERFAHRUNG', icon: <Award size={32} />, color: 'from-blue-400 to-cyan-600' },
              { number: '400+', label: 'FAHRZEUGE', icon: <Car size={32} />, color: 'from-purple-400 to-pink-600' },
              { number: '24/7', label: 'SUPPORT', icon: <Clock size={32} />, color: 'from-orange-400 to-red-600' }
            ].map((stat, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className="text-center cursor-pointer"
              >
                <div 
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg transition-all duration-500`}
                  style={{
                    transform: hoveredStat === index 
                      ? 'rotate(360deg) scale(1.15) translateY(-8px)' 
                      : 'rotate(0deg) scale(1) translateY(0px)'
                  }}
                >
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                
                <div 
                  className={`text-4xl lg:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 leading-none transition-transform duration-300`}
                  style={{
                    transform: hoveredStat === index ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  {stat.number}
                </div>
                
                <div 
                  className="text-sm lg:text-lg font-bold tracking-wider transition-colors duration-300"
                  style={{
                    color: hoveredStat === index ? 'rgb(255 255 255)' : 'rgb(156 163 175)'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
