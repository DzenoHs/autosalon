import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaSearch, FaEye, FaHeart, FaShare } from "react-icons/fa";
import { useCars } from "../context/CarsContext";
import FilterPanel from "../components/ui/FilterPanel";
import mobileApiService from "../services/mobileApiService";

const PAGE_SIZE = 12;
const FALLBACK_IMG = "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&crop=center";

export default function CarsPage() {
  const navigate = useNavigate();
  const { 
    allCars, 
    setAllCars, 
    filteredCars, 
    setFilteredCars, 
    isLoading, 
    setIsLoading, 
    error, 
    setError,
    totalCars,
    setTotalCars 
  } = useCars();

  // UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Početna', path: '/' },
    { label: 'Automobili', path: '/cars', active: true }
  ];

  // Dohvati automobile s API-ja
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("🔄 Dohvaćam automobile preko mobileApiService...");
        
        const result = await mobileApiService.fetchCarsFromMobileApi(1, 100);
        
        if (result.cars && result.cars.length > 0) {
          console.log(`✅ Dohvaćeno ${result.cars.length} automobila iz mobile.de API-ja`);
          
console.log("result.cars[0]")
console.log(result.cars[0])
          // Normaliziraj podatke iz mobile.de API-ja
          const normalizedCars = result.cars.map(car => ({
            id: car.mobileAdId || `car-${Date.now()}-${Math.random()}`,
            mobileAdId: car.mobileAdId,
            make: car.make || 'N/A',
            model: car.model || 'N/A',
            year: parseInt(car.year?.toString().slice(0, 4)) || new Date().getFullYear(),
            mileage: car.mileage || 0,
            price: {
              consumerPriceGross: car.price?.value || 0,
              value: car.price?.value || 0,
              currency: car.price?.currency || 'EUR'
            },
            fuel: car.fuel === 'PETROL' ? 'Benzin' : 
                  car.fuel === 'DIESEL' ? 'Diesel' : 
                  car.fuel === 'ELECTRIC' ? 'Elektrisch' : 
                  car.fuel === 'HYBRID' ? 'Hibrid' : 
                  car.fuel || 'Ostalo',
            gearbox: car.gearbox === 'MANUAL_GEAR' ? 'Manuell' : 
                     car.gearbox === 'AUTOMATIC_GEAR' ? 'Automatik' : 
                     car.gearbox === 'SEMI_AUTOMATIC_GEAR' ? 'Halbautomatik' : 
                     car.gearbox || 'N/A',
            power: car.power || 0,
            condition: car.condition === 'USED' ? 'Rabljen' : 
                      car.condition === 'NEW' ? 'Novi' : 
                      car.condition || 'N/A',
            images: car.images && car.images.length > 0 ? 
                   car.images : 
                   [{ url: car.mainImage || FALLBACK_IMG, alt: `${car.make} ${car.model}` }],
            description: car.description || `${car.make} ${car.model} u odličnom stanju`,
            address: car.address ? `${car.address.city}, ${car.address.country}` : 'Deutschland',
            creationDate: car.creationDate,
            modificationDate: car.modificationDate
          }));
          
          setAllCars(normalizedCars);
          setFilteredCars(normalizedCars);
          setTotalCars(result.total || normalizedCars.length);
        } else {
          throw new Error('API nije vratio automobile');
        }
        
      } catch (error) {
        console.error("❌ Greška pri dohvaćanju automobila:", error);
        setError(`Neuspješno učitavanje automobila iz mobile.de API-ja: ${error.message}`);
        
        // Ne koristimo hardkodirane podatke - samo prikažemo grešku
        setAllCars([]);
        setFilteredCars([]);
        setTotalCars(0);
        
      } finally {
        setIsLoading(false);
      }
    };

    if (allCars.length === 0) {
      fetchCars();
    }
  }, [allCars.length, setAllCars, setFilteredCars, setIsLoading, setError, setTotalCars]);

  // Search functionality
  const searchFilteredCars = useMemo(() => {
    if (!searchQuery.trim()) return filteredCars;
    
    return filteredCars.filter(car => 
      `${car.make} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.year?.toString().includes(searchQuery) ||
      car.fuel?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredCars, searchQuery]);

  // Pagination
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return searchFilteredCars.slice(startIndex, startIndex + PAGE_SIZE);
  }, [searchFilteredCars, currentPage]);

  const totalPages = Math.ceil(searchFilteredCars.length / PAGE_SIZE);

  // Handle car click
  const handleCarClick = (car) => {
    navigate(`/car/${car.mobileAdId || car.id}`);
  };

  // Format price
  const formatPrice = (priceObj) => {
    if (!priceObj || (!priceObj.consumerPriceGross && !priceObj.value)) return 'Na upit';
    const price = priceObj.consumerPriceGross || priceObj.value;
    if (price === 0) return 'Na upit';
    return `${price.toLocaleString('de-DE')} €`;
  };

  // Format mileage
  const formatMileage = (mileage) => {
    if (!mileage) return 'N/A';
    return `${mileage.toLocaleString('de-DE')} km`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Breadcrumbs */}
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {breadcrumbs.map((item, index) => (
                  <li key={index} className="inline-flex items-center">
                    {index > 0 && (
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {item.active ? (
                      <span className="text-blue-400 font-medium">{item.label}</span>
                    ) : (
                      <button 
                        onClick={() => navigate(item.path)}
                        className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Title & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Automobili</h1>
                <p className="text-gray-300 mt-1">
                  Pronađeno {searchFilteredCars.length} od {totalCars} automobila
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pretraži automobile..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-white placeholder-gray-400"
                  />
                </div>
                
                {/* Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    isFilterOpen 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                >
                  <FaFilter />
                  Filtri
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Filter Panel */}
        <FilterPanel isOpen={isFilterOpen} onToggle={() => setIsFilterOpen(!isFilterOpen)} />
        
        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-300">Učitavanje automobila...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-red-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-red-200">{error}</p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Osvježi stranicu
                  </button>
                </div>
              </div>
            )}

            {/* Cars Grid */}
            {!isLoading && searchFilteredCars.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginatedCars.map((car) => (
                    <div
                      key={car.mobileAdId || car.id}
                      onClick={() => handleCarClick(car)}
                      className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-700 hover:border-blue-500"
                    >
                      {/* Car Image */}
                      <div className="relative h-48 bg-gray-700">
                        <img
                          src={car.images?.[0]?.url || FALLBACK_IMG}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = FALLBACK_IMG;
                          }}
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button className="p-2 bg-gray-900/80 hover:bg-gray-900 rounded-full shadow-sm transition-colors">
                            <FaHeart className="w-4 h-4 text-gray-300" />
                          </button>
                          <button className="p-2 bg-gray-900/80 hover:bg-gray-900 rounded-full shadow-sm transition-colors">
                            <FaShare className="w-4 h-4 text-gray-300" />
                          </button>
                        </div>
                      </div>

                      {/* Car Info */}
                      <div className="p-4">
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {car.make} {car.model}
                          </h3>
                          <p className="text-sm text-gray-400">{car.year} • {formatMileage(car.mileage)}</p>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Gorivo:</span>
                            <span className="font-medium text-gray-200">{car.fuel || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Mjenjač:</span>
                            <span className="font-medium text-gray-200">{car.gearbox || car.transmission || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Snaga:</span>
                            <span className="font-medium text-gray-200">{car.power || 'N/A'} kW</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-green-400">
                            {formatPrice(car.price)}
                          </div>
                          <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                            <FaEye className="w-4 h-4" />
                            Detalji
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 text-gray-300"
                    >
                      Prethodna
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 border rounded-lg ${
                            currentPage === page
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-600 hover:bg-gray-700 text-gray-300'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 text-gray-300"
                    >
                      Sljedeća
                    </button>
                  </div>
                )}
              </>
            )}

            {/* No Results */}
            {!isLoading && searchFilteredCars.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Nema pronađenih automobila</h3>
                <p className="text-gray-400">Pokušajte promijeniti filtere ili pretragu</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Overlay */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}
