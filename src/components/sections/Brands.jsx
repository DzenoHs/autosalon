import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const brands = [
  { 
    name: 'BMW', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
    gradient: 'from-blue-500 to-cyan-600'
  },
  { 
    name: 'Mercedes-Benz', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
    gradient: 'from-gray-400 to-gray-600'
  },
  { 
    name: 'Audi', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
    gradient: 'from-red-500 to-pink-600'
  },
  { 
    name: 'Porsche', 
    logo: 'https://cdn.worldvectorlogo.com/logos/porsche.svg',
    gradient: 'from-yellow-500 to-orange-600'
  },
  { 
    name: 'Volkswagen', 
    logo: 'https://cdn.worldvectorlogo.com/logos/volkswagen-vw.svg',
    gradient: 'from-blue-600 to-indigo-700'
  },
  { 
    name: 'Ford', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
    gradient: 'from-blue-700 to-blue-900'
  },
  { 
    name: 'Tesla', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg',
    gradient: 'from-red-600 to-red-800'
  },
  { 
    name: 'Range Rover', 
    logo: 'https://cdn.worldvectorlogo.com/logos/land-rover-2.svg',
    gradient: 'from-green-600 to-emerald-800'
  },
];

export default function Brands() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-35"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 mb-16">
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
              UNSERE MARKEN
            </span>
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mx-auto mb-6 rounded-full"
          ></motion.div>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Premium Automobilmarken für anspruchsvolle Kunden
          </p>
        </motion.div>
      </div>

      {/* INFINITE CAROUSEL - BEZ MARGINA KOMPLETNO */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-neutral-900/80 via-black/60 to-neutral-900/80 backdrop-blur-xl border-y border-red-500/20">
        <div 
          ref={scrollRef}
          className="flex animate-infinite-scroll gap-8 md:gap-12 py-12 md:py-16 cursor-grab active:cursor-grabbing"
          style={{ 
            animationPlayState: isDragging ? 'paused' : 'running'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prvo duplirani set */}
          {brands.map((brand, index) => (
            <motion.div
              key={`first-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative flex-shrink-0 w-36 h-28 md:w-48 md:h-32"
            >
              <div className={`absolute -inset-2 bg-gradient-to-r ${brand.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500`}></div>
              
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-gray-300 select-none">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="max-w-28 max-h-20 md:max-w-36 md:max-h-24 object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300 pointer-events-none"
                  loading="lazy"
                  draggable="false"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center justify-center text-gray-700 font-bold text-base md:text-lg select-none">
                  {brand.name}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Drugi duplirani set za seamless loop */}
          {brands.map((brand, index) => (
            <div
              key={`second-${index}`}
              className="group relative flex-shrink-0 w-36 h-28 md:w-48 md:h-32"
            >
              <div className={`absolute -inset-2 bg-gradient-to-r ${brand.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-25 transition-all duration-500`}></div>
              
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-gray-300 hover:scale-105 hover:-translate-y-1 select-none">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="max-w-28 max-h-20 md:max-w-36 md:max-h-24 object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300 pointer-events-none"
                  loading="lazy"
                  draggable="false"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center justify-center text-gray-700 font-bold text-base md:text-lg select-none">
                  {brand.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fade overlays na krajevima */}
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* CSS za PRAVI infinite scroll */}
      <style jsx>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 24px)); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
