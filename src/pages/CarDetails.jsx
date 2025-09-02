import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Gauge, Fuel, Settings } from 'lucide-react';

const carsData = {
  1: {
    name: 'Audi RS7',
    price: '€95,000',
    year: '2023',
    km: '12,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '600 HP',
    img: 'https://images.unsplash.com/photo-1606152421802-db97b6c3633b?w=1200&h=800&fit=crop&crop=center',
    description: 'Izuzetno moćan i elegantan sportski sedan koji kombinuje luksuz sa performansama. RS7 je savršen izbor za one koji traže ultimativno vozačko iskustvo.',
    features: ['LED Matrix farovi', 'Quattro pogon', 'Bang & Olufsen audio', 'Sportska sedišta', 'Adaptivni vešanje']
  },
  2: {
    name: 'BMW M4',
    price: '€75,000',
    year: '2022',
    km: '18,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '510 HP',
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=800&fit=crop&crop=center',
    description: 'Ikonični sportski coupe sa neverovatnim performansama i preciznim upravljanjem. M4 je definicija sportskog vozila.',
    features: ['M Sport paket', 'Carbon fiber elementi', 'Harman Kardon audio', 'Sportski volante', 'M Track mode']
  },
  // Dodaj ostale aute...
};

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData[id];

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Auto nije pronađen</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-red-600 to-yellow-500 px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Nazad na početnu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Nazad na početnu</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={car.img} 
              alt={car.name}
              className="w-full h-96 object-cover rounded-xl shadow-2xl"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                {car.name}
              </span>
            </h1>
            
            <div className="text-4xl font-bold text-white mb-6">{car.price}</div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {car.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="text-red-500" size={20} />
                <span className="text-gray-300">{car.year}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Gauge className="text-red-500" size={20} />
                <span className="text-gray-300">{car.km}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Fuel className="text-red-500" size={20} />
                <span className="text-gray-300">{car.fuel}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Settings className="text-red-500" size={20} />
                <span className="text-gray-300">{car.transmission}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Oprema</h3>
              <ul className="space-y-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-gradient-to-r from-red-600 to-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              Rezerviši probnu vožnju
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
