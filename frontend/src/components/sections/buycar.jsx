import { Car, CalendarCheck, FileText, Truck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const brands = [
  { name: "Audi", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/audi.png" },
  { name: "BMW", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw.png" },
  { name: "Mercedes", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png" },
  { name: "Porsche", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/porsche.png" },
  { name: "Tesla", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tesla.png" },
  { name: "Lexus", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lexus.png" },
  { name: "Jaguar", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jaguar.png" },
  
  // doubling set for smooth scrolling
  { name: "Audi", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/audi.png" },
  { name: "BMW", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw.png" },
  { name: "Mercedes", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png" },
  { name: "Porsche", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/porsche.png" },
  { name: "Tesla", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tesla.png" },
  { name: "Lexus", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lexus.png" },
  { name: "Jaguar", src: "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jaguar.png" },
];

export default function BuyingProcessStrip() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { 
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { 
      icon: <Car size={28} className="md:w-8 md:h-8" />, 
      title: "Besichtigung", 
      description: "Detaillierte Fahrzeugbesichtigung mit Experten", 
      shortDesc: "Fahrzeug prüfen",
      gradient: "from-cyan-400 via-cyan-500 to-blue-600",
      shadow: "shadow-cyan-500/25"
    },
    { 
      icon: <CalendarCheck size={28} className="md:w-8 md:h-8" />, 
      title: "Reservierung", 
      description: "Online oder vor Ort reservieren", 
      shortDesc: "Schnell reservieren",
      gradient: "from-amber-400 via-amber-500 to-orange-500",
      shadow: "shadow-amber-500/25"
    },
    { 
      icon: <FileText size={28} className="md:w-8 md:h-8" />, 
      title: "Formalitäten", 
      description: "Komplette Hilfe bei Verträgen und Registrierung", 
      shortDesc: "Papiere erledigen",
      gradient: "from-emerald-400 via-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/25"
    },
    { 
      icon: <Truck size={28} className="md:w-8 md:h-8" />, 
      title: "Übergabe", 
      description: "Sichere Übergabe Ihres neuen Fahrzeugs", 
      shortDesc: "Auto abholen",
      gradient: "from-violet-400 via-purple-500 to-purple-600",
      shadow: "shadow-purple-500/25"
    },
  ];

  return (
    <section id="buycar" className="relative w-full h-full bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden flex flex-col" style={{minHeight: '100vh'}}>
      {/* Brand Showcase Section - Full Width at Top */}
      <div className="relative w-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-3 overflow-hidden border-b border-gray-700">
        {/* Overlays fade */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gray-900 to-transparent z-20" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-900 to-transparent z-20" />

        <div className="overflow-hidden">
          <div
            className="flex animate-marquee space-x-6 px-12"
            style={{ willChange: "transform" }}
          >
            {brands.map((brand, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-md hover:scale-110 hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] transition-transform duration-500 ease-in-out flex items-center justify-center cursor-pointer"
                title={brand.name}
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  draggable={false}
                  className="max-w-12 max-h-12 select-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CSS Keyframes za marquee */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </div>

      {/* Buying Process Section - Below brands */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
        {/* Header */}
        <div className={`mb-8 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Wie Sie bei uns ein Auto kaufen
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Vier einfache Schritte zu Ihrem Traumfahrzeug – transparent, sicher und professionell
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="relative flex items-center justify-between mb-8">
            {/* Connection Line */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent z-0"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className={`relative flex flex-col items-center flex-1 z-10 transform transition-all duration-700 delay-${idx * 200} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {/* Step Number Badge */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-gray-700 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {idx + 1}
                </div>
                
                {/* Step Circle */}
                <div className="relative group cursor-pointer">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} ${step.shadow} shadow-lg border-2 border-gray-800 group-hover:scale-105 transition-all duration-300`}>
                    <span className="text-white text-sm">{step.icon}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="mt-3 text-center max-w-[10rem]">
                  <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">{step.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards Layout */}
        <div className="md:hidden space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className={`transform transition-all duration-700 delay-${idx * 150} ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
                {/* Step Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{idx + 1}</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} ${step.shadow} shadow-lg flex-shrink-0`}>
                    <span className="text-white">{step.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.shortDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-12 md:mt-16 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button
            onClick={() => window.open('/kako-kupiti', '_blank')}
            className="group relative inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative z-10">Detaillierte Prozesserklärung</span>
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            
            {/* Button Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
