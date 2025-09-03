import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Gauge, Fuel, Settings, Phone } from 'lucide-react';

const carsData = {
  1: {
    name: 'Audi RS7',
    price: '€80,000',
    year: '2023',
    km: '12,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '4.0L V8 – 600 PS',
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop&crop=center',
    description: 'Izuzetno moćan i elegantan sportski sedan koji kombinuje luksuz sa performansama. RS7 je savršen izbor za one koji traže ultimativno vozačko iskustvo.',
    features: ['LED Matrix farovi', 'Quattro pogon', 'Bang & Olufsen audio', 'Sportska sedišta', 'Adaptivni vešanje']
  },
  2: {
    name: 'BMW M4',
    price: '€63,000',
    year: '2022',
    km: '18,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '3.0L R6 – 510 PS',
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=800&fit=crop&crop=center',
    description: 'Ikonični sportski coupe sa neverovatnim performansama i preciznim upravljanjem. M4 je definicija sportskog vozila.',
    features: ['M Sport paket', 'Carbon fiber elementi', 'Harman Kardon audio', 'Sportski volante', 'M Track mode']
  },
  3: {
    name: 'Mercedes GLE',
    price: '€70,000',
    year: '2021',
    km: '35,000 km',
    fuel: 'Dizel',
    transmission: 'Automatik',
    power: '3.0L R6 – 330 PS',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center',
    description: 'Luksuzni SUV koji kombinuje eleganciju sa praktičnošću. Idealno vozilo za porodicu koja ne želi kompromise.',
    features: ['AIRMATIC vešanje', 'Burmester audio', 'Panorama sunroof', 'MBUX sistem', '9G-Tronic mjenjač']
  },
  4: {
    name: 'Porsche Panamera',
    price: '€92,000',
    year: '2022',
    km: '9,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: '4.0L V8 – 630 PS',
    img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&h=800&fit=crop&crop=center',
    description: 'Sportski sedan koji definiše luksuz i performanse. Panamera je savršena kombinacija sportskog duha i elegancije.',
    features: ['Porsche Active Suspension', 'Bose Surround Sound', 'Sport Chrono paket', 'Matrix LED farovi', 'Porsche Communication Management']
  },
  5: {
    name: 'VW Touareg',
    price: '€38,000',
    year: '2020',
    km: '42,000 km',
    fuel: 'Dizel',
    transmission: 'Automatik',
    power: '3.0L V6 – 286 PS',
    img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop&crop=center',
    description: 'Pouzdan i komforan SUV sa izvrsnim performansama kako na putu tako i van njega. Idealan za avanture i svakodnevnu upotrebu.',
    features: ['4MOTION pogon', 'Air Suspension', 'Digital Cockpit Pro', 'IQ.LIGHT LED farovi', 'Travel Assist']
  },
  6: {
    name: 'Audi Q5',
    price: '€33,000',
    year: '2021',
    km: '28,000 km',
    fuel: 'Dizel',
    transmission: 'Manuelni',
    power: '2.0L R4 – 190 PS',
    img: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=1200&h=800&fit=crop&crop=center',
    description: 'Kompaktni premium SUV koji kombinuje praktičnost sa luksuzom. Q5 je idealan izbor za urbane uslove sa mogućnošću off-road vožnje.',
    features: ['Quattro pogon', 'Virtual Cockpit', 'MMI Navigation plus', 'LED Plus farovi', 'Audi connect']
  }
};

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData[id];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Auto nije pronađen</h1>
          <button 
            onClick={handleGoBack}
            className="bg-gradient-to-r from-red-600 to-yellow-500 px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Idi nazad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-red-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleGoBack}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-white hover:text-red-500 transition-colors group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg font-semibold">Idi nazad</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img 
              src={car.img} 
              alt={car.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                  {car.name}
                </span>
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl lg:text-4xl font-bold text-white">{car.price}</span>
                <div className="bg-gradient-to-r from-red-500 to-yellow-500 px-3 py-1 rounded-full text-sm font-bold">
                  Premium
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {car.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-neutral-800/50 rounded-2xl border border-red-500/20">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-xl"
              >
                <Calendar className="text-red-500" size={20} />
                <div>
                  <div className="text-gray-400 text-sm">Godina</div>
                  <div className="text-white font-semibold">{car.year}</div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-xl"
              >
                <Gauge className="text-red-500" size={20} />
                <div>
                  <div className="text-gray-400 text-sm">Kilometraža</div>
                  <div className="text-white font-semibold">{car.km}</div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-xl"
              >
                <Fuel className="text-red-500" size={20} />
                <div>
                  <div className="text-gray-400 text-sm">Gorivo</div>
                  <div className="text-white font-semibold">{car.fuel}</div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-xl"
              >
                <Settings className="text-red-500" size={20} />
                <div>
                  <div className="text-gray-400 text-sm">Mjenjač</div>
                  <div className="text-white font-semibold">{car.transmission}</div>
                </div>
              </motion.div>
            </div>

            {/* Features */}
            <div className="bg-neutral-800/30 p-6 rounded-2xl border border-red-500/10">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">Oprema</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-2"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-red-600 to-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all shadow-red-500/25 flex items-center justify-center gap-3"
              >
                <Phone size={20} />
                Kontaktiraj nas
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-500 hover:text-white transition-all"
              >
                Rezerviši probnu vožnju
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
