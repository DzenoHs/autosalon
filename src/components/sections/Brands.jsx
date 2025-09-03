import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
  { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
  { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Porsche_logo.svg' },
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg' },
  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg' },
  { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Ferrari_logo.svg' },
  { name: 'Lamborghini', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Lamborghini_logo.svg' },
  { name: 'Opel', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Opel-Logo_2017.svg' },
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Toyota_logo.svg' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Nissan_logo.svg' },
];

export default function Brands() {
  return (
    <section className="py-12 bg-black border-y border-neutral-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Brendovi koje nudimo
            </span>
          </h2>
          <p className="text-gray-500 text-sm">Premium marke za najzahtjevnije kupce</p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-12 py-4">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-28 h-16 flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-20 max-h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-28 h-16 flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-20 max-h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
