import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'BMW', logo: 'https://logos-world.net/wp-content/uploads/2020/08/BMW-Logo.png' },
  { name: 'Mercedes-Benz', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Mercedes-Logo.png' },
  { name: 'Audi', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Audi-Logo.png' },
  { name: 'Porsche', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Porsche-Logo.png' },
  { name: 'Volkswagen', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Volkswagen-Logo.png' },
  { name: 'Tesla', logo: 'https://logos-world.net/wp-content/uploads/2021/08/Tesla-Logo.png' },
  { name: 'Ferrari', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Ferrari-Logo.png' },
  { name: 'Lamborghini', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Lamborghini-Logo.png' },
  { name: 'McLaren', logo: 'https://logos-world.net/wp-content/uploads/2021/03/McLaren-Logo.png' },
  { name: 'Bentley', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Bentley-Logo.png' },
  { name: 'Rolls-Royce', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Rolls-Royce-Logo.png' },
  { name: 'Maserati', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Maserati-Logo.png' },
];

export default function Brands() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-neutral-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] animate-pulse"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
              UNSERE MARKEN
            </span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide">
            Premium-Automarken für anspruchsvolle Kunden
          </p>
        </motion.div>

        {/* Brutal Modern Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900/80 via-black/60 to-neutral-900/80 backdrop-blur-xl border border-red-500/20 shadow-2xl">
            <div className="flex animate-marquee space-x-12 py-12">
              {/* First set */}
              {brands.map((brand, index) => (
                <motion.div
                  key={`first-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-40 h-28 flex items-center justify-center bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-110 group border-2 border-transparent hover:border-red-500/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="max-w-32 max-h-20 object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300 relative z-10"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center text-gray-600 font-bold text-lg">
                    {brand.name}
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {brands.map((brand, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-40 h-28 flex items-center justify-center bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-110 group border-2 border-transparent hover:border-red-500/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="max-w-32 max-h-20 object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300 relative z-10"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center text-gray-600 font-bold text-lg">
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Premium gradient overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none z-20"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none z-20"></div>
        </div>
      </div>
    </section>
  );
}
