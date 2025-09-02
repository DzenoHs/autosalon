import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Gauge, Fuel, ArrowLeft, Search, Filter } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const allCars = [
  {
    id: 1,
    name: 'Audi RS7',
    price: '€95,000',
    year: '2023',
    km: '12,000 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1606152421802-db97b6c3633b?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 2,
    name: 'BMW M4',
    price: '€75,000',
    year: '2022',
    km: '18,000 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 3,
    name: 'Mercedes-AMG GT',
    price: '€120,000',
    year: '2023',
    km: '8,000 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 4,
    name: 'Porsche 911 Turbo',
    price: '€180,000',
    year: '2023',
    km: '3,000 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 5,
    name: 'Range Rover Velar',
    price: '€90,000',
    year: '2023',
    km: '7,000 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 6,
    name: 'Tesla Model S',
    price: '€110,000',
    year: '2023',
    km: '5,000 km',
    fuel: 'Electric',
    img: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 7,
    name: 'Lamborghini Huracán',
    price: '€220,000',
    year: '2022',
    km: '2,500 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 8,
    name: 'Ferrari 488 GTB',
    price: '€280,000',
    year: '2022',
    km: '4,200 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 9,
    name: 'McLaren 720S',
    price: '€310,000',
    year: '2023',
    km: '1,800 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 10,
    name: 'Bentley Continental GT',
    price: '€250,000',
    year: '2023',
    km: '6,000 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1615832936161-93a3fd0b2c89?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 11,
    name: 'Aston Martin DB11',
    price: '€190,000',
    year: '2022',
    km: '9,500 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1555626040-6ca252c4a4d0?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 12,
    name: 'Maserati MC20',
    price: '€240,000',
    year: '2023',
    km: '1,200 km',
    fuel: 'Benzin',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center'
  }
];

// 3D Sphere komponenta
function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} position={[2, 0, 0]}>
        <MeshDistortMaterial
          color="#ef4444"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function CarsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const price = parseInt(car.price.replace(/[€,]/g, ''));
    
    let matchesPrice = true;
    if (priceFilter === 'under100k') matchesPrice = price < 100000;
    else if (priceFilter === '100k-200k') matchesPrice = price >= 100000 && price <= 200000;
    else if (priceFilter === 'over200k') matchesPrice = price > 200000;
    
    return matchesSearch && matchesPrice;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -20,
      rotateX: 10,
      rotateY: 10,
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
      {/* Header sa Back dugmetom */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 bg-black/90 backdrop-blur-lg border-b border-red-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 text-white hover:text-red-500 transition-colors group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-lg font-semibold">Nazad na početnu</span>
            </motion.button>
            
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                AUTOLUX KOLEKCIJA
              </span>
            </h1>
            
            <div className="text-white/60">
              {allCars.length} vozila
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero sekcija za Cars stranicu sa 3D pozadinom */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-6 overflow-hidden h-96"
      >
        {/* 3D pozadina */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#ef4444" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#eab308" />
              <AnimatedSphere />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              PREMIUM VOZILA
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Ekskluzivna kolekcija najluksuznijih automobila. Svako vozilo je pažljivo odabrano i provjereno.
          </motion.p>
        </div>
      </motion.section>

      {/* Search i Filter sekcija */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="px-6 mb-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-neutral-800/50 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
              <input
                type="text"
                placeholder="Pretraži automobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-900 text-white rounded-xl border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-4">
              <Filter className="text-red-500" size={20} />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-neutral-900 text-white px-4 py-3 rounded-xl border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
              >
                <option value="all">Sve cijene</option>
                <option value="under100k">Do €100,000</option>
                <option value="100k-200k">€100,000 - €200,000</option>
                <option value="over200k">Preko €200,000</option>
              </select>
              
              <div className="text-white/60 ml-4">
                {filteredCars.length} rezultata
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Grid automobila */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 pb-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                variants={cardVariants}
                whileHover="hover"
                className="group cursor-pointer"
                onClick={() => navigate(`/car/${car.id}`)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  variants={hoverVariants}
                  className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-red-500/20 hover:border-red-500/80 transition-all duration-500 hover:shadow-red-500/25"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(239, 68, 68, 0.1)'
                  }}
                >
                  {/* Slika automobila */}
                  <div className="relative overflow-hidden group-hover:bg-gradient-to-t group-hover:from-red-500/20 group-hover:to-transparent">
                    <motion.img
                      src={car.img}
                      alt={car.name}
                      className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-1"
                      loading="lazy"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"></div>
                    
                    {/* Price badge */}
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg"
                    >
                      {car.price}
                    </motion.div>
                  </div>

                  {/* Informacije o automobilu */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                      {car.name}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={16} className="text-red-500" />
                        <span className="text-sm">{car.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Gauge size={16} className="text-red-500" />
                        <span className="text-sm">{car.km}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Fuel size={16} className="text-red-500" />
                        <span className="text-sm">{car.fuel}</span>
                      </div>
                    </div>

                    {/* Hover dugme */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all">
                        Pogledaj detalje →
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
