import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const cars = [
  {
    id: 1,
    name: 'Audi RS7',
    year: '2023',
    km: '12,000 km',
    priceNet: '€80,000',
    priceGross: '€95,000',
  img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&crop=center',
    fuel: 'Benzin',
    gearbox: 'Automatik',
    engine: '4.0L V8 – 600 PS'
  },
  {
    id: 2,
    name: 'BMW M4',
    year: '2022',
    km: '18,000 km',
    priceNet: '€63,000',
    priceGross: '€75,000',
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop&crop=center',
    fuel: 'Benzin',
    gearbox: 'Automatik',
    engine: '3.0L R6 – 510 PS'
  },
  {
    id: 3,
    name: 'Mercedes GLE',
    year: '2021',
    km: '35,000 km',
    priceNet: '€70,000',
    priceGross: '€85,000',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center',
    fuel: 'Diesel',
    gearbox: 'Automatik',
    engine: '3.0L R6 – 330 PS'
  },
  {
    id: 4,
    name: 'Porsche Panamera',
    year: '2022',
    km: '9,000 km',
    priceNet: '€92,000',
    priceGross: '€110,000',
  img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop&crop=center',
    fuel: 'Benzin',
    gearbox: 'Automatik',
    engine: '4.0L V8 – 630 PS'
  },
  {
    id: 5,
    name: 'VW Touareg',
    year: '2020',
    km: '42,000 km',
    priceNet: '€38,000',
    priceGross: '€45,000',
    img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop&crop=center',
    fuel: 'Diesel',
    gearbox: 'Automatik',
    engine: '3.0L V6 – 286 PS'
  },
  {
    id: 6,
    name: 'Audi Q5',
    year: '2021',
    km: '28,000 km',
    priceNet: '€33,000',
    priceGross: '€39,000',
    img: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=800&h=600&fit=crop&crop=center',
    fuel: 'Diesel',
    gearbox: 'Manuell',
    engine: '2.0L R4 – 190 PS'
  }
];

export default function Cars() {
  const navigate = useNavigate();

  return (
    <section id="cars" className="py-20 px-6 bg-neutral-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              AUSGEWÄHLTE FAHRZEUGE
            </span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl px-4">Finden Sie das perfekte Auto für Sie</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl overflow-hidden shadow-xl border border-neutral-700 hover:border-red-500 transition-all duration-200"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={car.img} 
                  alt={car.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-200"></div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-white mb-1 tracking-wide">{car.name}</h3>
                <div className="flex justify-between text-gray-400 text-sm mb-2">
                  <span className="bg-neutral-700 px-2 py-1 rounded">{car.year}</span>
                  <span className="bg-neutral-700 px-2 py-1 rounded">{car.km}</span>
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <span className="text-lg text-gray-400">Brutto: <span className="font-bold text-white">{car.priceGross}</span></span>
                  <span className="text-lg text-gray-400">Netto: <span className="text-3xl font-extrabold text-yellow-400 tracking-tight">{car.priceNet}</span></span>
                </div>
                <div className="flex flex-wrap gap-2 text-gray-300 text-sm mb-2">
                  <span className="bg-neutral-700 px-2 py-1 rounded">{car.fuel}</span>
                  <span className="bg-neutral-700 px-2 py-1 rounded">{car.gearbox}</span>
                  <span className="bg-neutral-700 px-2 py-1 rounded">{car.engine}</span>
                </div>
                <button 
                  onClick={() => navigate(`/car/${car.id}`)}
                  className="mt-2 bg-gradient-to-r from-red-600 to-yellow-500 px-6 py-2 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-transform"
                >
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Dugme za sve automobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => navigate('/cars')}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-500 to-yellow-500 text-white text-xl font-bold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
          >
            Alle Fahrzeuge ansehen →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
