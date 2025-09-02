import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const cars = [
  {
    id: 1,
    name: 'Audi RS7',
    price: '€95,000',
    year: '2023',
    km: '12,000 km',
    img: 'https://images.unsplash.com/photo-1606152421802-db97b6c3633b?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 2,
    name: 'BMW M4',
    price: '€75,000',
    year: '2022',
    km: '18,000 km',
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 3,
    name: 'Mercedes GLE',
    price: '€85,000',
    year: '2021',
    km: '35,000 km',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center'
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
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              PREMIUM VOZILA
            </span>
          </h2>
          <p className="text-gray-400 text-xl">Pronađite savršen auto za vas</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-neutral-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={car.img} 
                  alt={car.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                <div className="flex justify-between text-gray-400 mb-4">
                  <span>{car.year}</span>
                  <span>{car.km}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                    {car.price}
                  </span>
                  <button 
                    onClick={() => navigate(`/car/${car.id}`)}
                    className="bg-gradient-to-r from-red-600 to-yellow-500 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
                  >
                    Detalji
                  </button>
                </div>
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
            Pogledaj sve automobile →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
