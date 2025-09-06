import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Gauge, Fuel, ArrowLeft, Search, Filter, ChevronDown, X, Settings, Zap, Shield } from 'lucide-react';

const allCars = [
  {
    id: 1,
    name: 'Audi RS7',
    brand: 'Audi',
    model: 'RS7',
    type: 'Limousine',
    price: 95000,
    priceDisplay: '€95,000',
    year: 2023,
    km: 12000,
    kmDisplay: '12,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 600,
    powerDisplay: '600 PS',
    condition: 'Gebraucht',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 2,
    name: 'BMW M4',
    brand: 'BMW',
    model: 'M4',
    type: 'Coupe',
    price: 75000,
    priceDisplay: '€75,000',
    year: 2022,
    km: 18000,
    kmDisplay: '18,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 510,
    powerDisplay: '510 PS',
    condition: 'Gebraucht',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 3,
    name: 'Mercedes GLE',
    brand: 'Mercedes',
    model: 'GLE',
    type: 'SUV',
    price: 85000,
    priceDisplay: '€85,000',
    year: 2021,
    km: 35000,
    kmDisplay: '35,000 km',
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 330,
    powerDisplay: '330 PS',
    condition: 'Gebraucht',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 4,
    name: 'Porsche Panamera',
    brand: 'Porsche',
    model: 'Panamera',
    type: 'Limousine',
    price: 110000,
    priceDisplay: '€110,000',
    year: 2022,
    km: 9000,
    kmDisplay: '9,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 630,
    powerDisplay: '630 PS',
    condition: 'Gebraucht',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 5,
    name: 'VW Touareg',
    brand: 'Volkswagen',
    model: 'Touareg',
    type: 'SUV',
    price: 45000,
    priceDisplay: '€45,000',
    year: 2020,
    km: 42000,
    kmDisplay: '42,000 km',
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 286,
    powerDisplay: '286 PS',
    condition: 'Gebraucht',
    warranty: false,
    img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 6,
    name: 'Audi Q5',
    brand: 'Audi',
    model: 'Q5',
    type: 'SUV',
    price: 39000,
    priceDisplay: '€39,000',
    year: 2021,
    km: 28000,
    kmDisplay: '28,000 km',
    fuel: 'Diesel',
    transmission: 'Manuelni',
    power: 190,
    powerDisplay: '190 PS',
    condition: 'Gebraucht',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 7,
    name: 'Tesla Model S',
    brand: 'Tesla',
    model: 'Model S',
    type: 'Limousine',
    price: 89000,
    priceDisplay: '€89,000',
    year: 2023,
    km: 5000,
    kmDisplay: '5,000 km',
    fuel: 'Električni',
    transmission: 'Automatik',
    power: 670,
    powerDisplay: '670 PS',
    condition: 'Neu',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 8,
    name: 'Ferrari 488',
    brand: 'Ferrari',
    model: '488',
    type: 'Coupe',
    price: 280000,
    priceDisplay: '€280,000',
    year: 2022,
    km: 4200,
    kmDisplay: '4,200 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 670,
    powerDisplay: '670 PS',
    condition: 'Gebraucht',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 9,
    name: 'Range Rover Velar',
    brand: 'Land Rover',
    model: 'Range Rover Velar',
    type: 'SUV',
    price: 90000,
    priceDisplay: '€90,000',
    year: 2023,
    km: 7000,
    kmDisplay: '7,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 380,
    powerDisplay: '380 PS',
    condition: 'Neu',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 10,
    name: 'Bentley Continental',
    brand: 'Bentley',
    model: 'Continental',
    type: 'Coupe',
    price: 250000,
    priceDisplay: '€250,000',
    year: 2023,
    km: 6000,
    kmDisplay: '6,000 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 635,
    powerDisplay: '635 PS',
    condition: 'Neu',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1615832936161-93a3fd0b2c89?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 11,
    name: 'Lamborghini Huracán',
    brand: 'Lamborghini',
    model: 'Huracán',
    type: 'Coupe',
    price: 220000,
    priceDisplay: '€220,000',
    year: 2022,
    km: 2500,
    kmDisplay: '2,500 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 610,
    powerDisplay: '610 PS',
    condition: 'Gebraucht',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center'
  },
  {
    id: 12,
    name: 'McLaren 720S',
    brand: 'McLaren',
    model: '720S',
    type: 'Coupe',
    price: 310000,
    priceDisplay: '€310,000',
    year: 2023,
    km: 1800,
    kmDisplay: '1,800 km',
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 720,
    powerDisplay: '720 PS',
    condition: 'Neu',
    warranty: true,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center'
  }
];

export default function CarsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Basic filters
  const [filters, setFilters] = useState({
    brand: '',
    type: '',
    fuel: '',
    condition: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: ''
  });
  
  // Advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    transmission: '',
    powerFrom: '',
    powerTo: '',
    warranty: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get unique values for filter options
  const getUniqueValues = (key) => {
    return [...new Set(allCars.map(car => car[key]))].sort();
  };

  const brands = getUniqueValues('brand');
  const types = getUniqueValues('type');
  const fuels = getUniqueValues('fuel');
  const conditions = getUniqueValues('condition');
  const transmissions = getUniqueValues('transmission');

  // Filter cars based on all criteria
  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = !filters.brand || car.brand === filters.brand;
    const matchesType = !filters.type || car.type === filters.type;
    const matchesFuel = !filters.fuel || car.fuel === filters.fuel;
    const matchesCondition = !filters.condition || car.condition === filters.condition;
    
    const matchesYearFrom = !filters.yearFrom || car.year >= parseInt(filters.yearFrom);
    const matchesYearTo = !filters.yearTo || car.year <= parseInt(filters.yearTo);
    
    const matchesPriceFrom = !filters.priceFrom || car.price >= parseInt(filters.priceFrom);
    const matchesPriceTo = !filters.priceTo || car.price <= parseInt(filters.priceTo);
    
    const matchesTransmission = !advancedFilters.transmission || car.transmission === advancedFilters.transmission;
    const matchesPowerFrom = !advancedFilters.powerFrom || car.power >= parseInt(advancedFilters.powerFrom);
    const matchesPowerTo = !advancedFilters.powerTo || car.power <= parseInt(advancedFilters.powerTo);
    const matchesWarranty = !advancedFilters.warranty || 
                           (advancedFilters.warranty === 'true' && car.warranty) ||
                           (advancedFilters.warranty === 'false' && !car.warranty);
    
    return matchesSearch && matchesBrand && matchesType && matchesFuel && matchesCondition &&
           matchesYearFrom && matchesYearTo && matchesPriceFrom && matchesPriceTo &&
           matchesTransmission && matchesPowerFrom && matchesPowerTo && matchesWarranty;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAdvancedFilterChange = (key, value) => {
    setAdvancedFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      brand: '',
      type: '',
      fuel: '',
      condition: '',
      yearFrom: '',
      yearTo: '',
      priceFrom: '',
      priceTo: ''
    });
    setAdvancedFilters({
      transmission: '',
      powerFrom: '',
      powerTo: '',
      warranty: ''
    });
  };

  const activeFiltersCount = Object.values({...filters, ...advancedFilters}).filter(val => val !== '').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
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
              <span className="text-lg font-semibold">Zurück</span>
            </motion.button>
            
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Alle Fahrzeuge
              </span>
            </h1>
            
            <div className="text-white/60">
              {filteredCars.length} von {allCars.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Filter System */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="px-6 mb-8 pt-8"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Main Search Bar */}
          <div className="bg-neutral-800/50 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                <input
                  type="text"
                  placeholder="Pretraži po marki, modelu ili imenu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-neutral-900 text-white rounded-xl border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="bg-neutral-900 text-white px-4 py-3 rounded-xl border border-neutral-700 focus:border-red-500 focus:outline-none transition-all min-w-[120px]"
                >
                  <option value="">Alle Marken</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="bg-neutral-900 text-white px-4 py-3 rounded-xl border border-neutral-700 focus:border-red-500 focus:outline-none transition-all min-w-[120px]"
                >
                  <option value="">Alle Typen</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  value={filters.fuel}
                  onChange={(e) => handleFilterChange('fuel', e.target.value)}
                  className="bg-neutral-900 text-white px-4 py-3 rounded-xl border border-neutral-700 focus:border-red-500 focus:outline-none transition-all min-w-[120px]"
                >
                  <option value="">Sve goriva</option>
                  {fuels.map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>

                {/* Advanced Filters Toggle */}
                <motion.button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all relative"
                >
                  <Filter size={18} />
                  Više filtera
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${showAdvancedFilters ? 'rotate-180' : ''}`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Results Counter and Clear */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-700">
              <div className="text-white/80">
                Pronađeno <span className="font-bold text-red-500">{filteredCars.length}</span> von {allCars.length} Fahrzeuge
              </div>
              
              {activeFiltersCount > 0 && (
                <motion.button
                  onClick={clearAllFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                  Obriši sve filtere
                </motion.button>
              )}
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-800/30 backdrop-blur-lg rounded-2xl border border-red-500/10 overflow-hidden"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Condition Filter */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Shield size={16} className="text-red-500" />
                        Stanje
                      </label>
                      <select
                        value={filters.condition}
                        onChange={(e) => handleFilterChange('condition', e.target.value)}
                        className="w-full bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                      >
                        <option value="">Alle Zust�nde</option>
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                    </div>

                    {/* Transmission Filter */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Settings size={16} className="text-red-500" />
                        Mjenjač
                      </label>
                      <select
                        value={advancedFilters.transmission}
                        onChange={(e) => handleAdvancedFilterChange('transmission', e.target.value)}
                        className="w-full bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                      >
                        <option value="">Svi mjenjači</option>
                        {transmissions.map(transmission => (
                          <option key={transmission} value={transmission}>{transmission}</option>
                        ))}
                      </select>
                    </div>

                    {/* Warranty Filter */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Shield size={16} className="text-red-500" />
                        Garancija
                      </label>
                      <select
                        value={advancedFilters.warranty}
                        onChange={(e) => handleAdvancedFilterChange('warranty', e.target.value)}
                        className="w-full bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                      >
                        <option value="">Sve opcije</option>
                        <option value="true">Sa garancijom</option>
                        <option value="false">Bez garancije</option>
                      </select>
                    </div>

                    {/* Year Range */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Calendar size={16} className="text-red-500" />
                        Godina
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Od"
                          value={filters.yearFrom}
                          onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                          className="flex-1 bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                          min="2000"
                          max="2024"
                        />
                        <input
                          type="number"
                          placeholder="Do"
                          value={filters.yearTo}
                          onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                          className="flex-1 bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                          min="2000"
                          max="2024"
                        />
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        €
                        Cijena (€)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Od"
                          value={filters.priceFrom}
                          onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                          className="flex-1 bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                          min="0"
                          step="1000"
                        />
                        <input
                          type="number"
                          placeholder="Do"
                          value={filters.priceTo}
                          onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                          className="flex-1 bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                          min="0"
                          step="1000"
                        />
                      </div>
                    </div>

                    {/* Power Range */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Zap size={16} className="text-red-500" />
                        Snaga (PS)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Od"
                          value={advancedFilters.powerFrom}
                          onChange={(e) => handleAdvancedFilterChange('powerFrom', e.target.value)}
                          className="flex-1 bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                          min="0"
                          step="10"
                        />
                        <input
                          type="number"
                          placeholder="Do"
                          value={advancedFilters.powerTo}
                          onChange={(e) => handleAdvancedFilterChange('powerTo', e.target.value)}
                          className="flex-1 bg-neutral-900 text-white px-3 py-2 rounded-lg border border-neutral-700 focus:border-red-500 focus:outline-none transition-all"
                          min="0"
                          step="10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Grid automobila */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={filteredCars.length}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-6 pb-20"
        >
          <div className="max-w-7xl mx-auto">
            {filteredCars.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold text-white mb-4">Keine Ergebnisse</h3>
                <p className="text-gray-400 mb-8">Pokušajte promijeniti filtere pretragu</p>
                <motion.button
                  onClick={clearAllFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                >
                  Obriši sve filtere
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group cursor-pointer"
                    onClick={() => navigate(`/car/${car.id}`)}
                    style={{ perspective: '1000px' }}
                    layout
                  >
                    <motion.div
                      variants={hoverVariants}
                      className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-red-500/20 hover:border-red-500/80 transition-all duration-500 hover:shadow-red-500/25 h-full flex flex-col"
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
                          className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                        
                        {/* Price badge */}
                        <motion.div 
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.5 }}
                          className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg"
                        >
                          {car.priceDisplay}
                        </motion.div>

                        {/* Condition badge */}
                        {car.condition === 'Neu' && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full font-bold text-xs">
                            Neu
                          </div>
                        )}

                        {/* Warranty badge */}
                        {car.warranty && (
                          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-2 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                            <Shield size={10} />
                            GARANCIJA
                          </div>
                        )}
                      </div>

                      {/* Informacije o automobilu */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                          {car.name}
                        </h3>
                        
                        <div className="text-sm text-gray-400 mb-3">
                          {car.brand} • {car.type}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Calendar size={14} className="text-red-500" />
                            <span>{car.year}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Gauge size={14} className="text-red-500" />
                            <span>{car.kmDisplay}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Fuel size={14} className="text-red-500" />
                            <span>{car.fuel}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Settings size={14} className="text-red-500" />
                            <span>{car.transmission}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Zap size={14} className="text-yellow-500" />
                            <span>{car.powerDisplay}</span>
                          </div>
                        </div>

                        {/* Hover dugme */}
                        <motion.div 
                          className="mt-auto pt-4 border-t border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all">
                            Details ansehen →
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
