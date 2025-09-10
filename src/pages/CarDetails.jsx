import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Gauge, Fuel, Settings, Phone, Mail, MapPin, 
  Palette, Users, ShieldCheck, Zap, ChevronLeft, ChevronRight, X,
  Eye, Car, Cog, Heart, Share2, Home
} from 'lucide-react';
import { useCars } from '../context/CarsContext';
import mobileApiService from '../services/mobileApiService';

const FALLBACK_IMG = "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&crop=center";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allCars } = useCars();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Početna', path: '/', icon: Home },
    { label: 'Automobili', path: '/cars' },
    { label: car ? `${car.make} ${car.model}` : 'Detalji', path: '#', active: true }
  ];

  // Učitaj car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`🔍 Učitavam detalje automobila ID: ${id}`);

        // Prvo pokušaj pronaći auto u lokalnome cache-u
        let foundCar = allCars.find(car => 
          (car.mobileAdId && car.mobileAdId === id) || 
          (car.id && car.id === id)
        );

        if (foundCar) {
          console.log('✅ Auto pronađen u cache-u:', foundCar);
          setCar(foundCar);
          setLoading(false);
          return;
        }

        // Ako nije u cache-u, dohvati iz API-ja
        try {
          const result = await mobileApiService.fetchCarDetails(id);
          if (result && result.car) {
            setCar(result.car);
            console.log('✅ Car details uspješno učitani iz API-ja:', result.car);
          } else {
            throw new Error('Automobil nije pronađen u API-ju');
          }
        } catch (apiError) {
          console.log('⚠️ API nedostupan ili auto nije pronađen');
          throw new Error('Automobil nije pronađen');
        }
        
      } catch (err) {
        console.error('❌ Greška pri učitavanju car details:', err);
        setError('Greška pri dohvaćanju podataka automobila');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
      window.scrollTo(0, 0);
    }
  }, [id, allCars]);

  // Navigacija slika
  const nextImage = () => {
    if (car?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showImageModal) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setShowImageModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showImageModal, car]);

  const handleGoBack = () => {
    navigate('/cars');
  };

  // Format helper functions
  const formatPrice = (priceObj) => {
    if (!priceObj) return 'Na upit';
    const price = priceObj.consumerPriceGross || priceObj.value || priceObj;
    return `${price.toLocaleString('de-DE')} €`;
  };

  const formatMileage = (mileage) => {
    if (!mileage) return 'N/A';
    return `${mileage.toLocaleString('de-DE')} km`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Učitavam detalje automobila...</h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Automobil nije pronađen</h1>
          <p className="text-gray-600 mb-6">{error || 'Traženi automobil ne postoji ili je uklonjen.'}</p>
          <button 
            onClick={handleGoBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="inline mr-2" size={20} />
            Nazad na listu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
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
                      <span className="text-blue-600 font-medium truncate max-w-32">{item.label}</span>
                    ) : (
                      <button 
                        onClick={() => navigate(item.path)}
                        className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                      >
                        {item.icon && <item.icon size={16} />}
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleGoBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
                Nazad na listu
              </button>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={car.images?.[selectedImageIndex]?.url || FALLBACK_IMG}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                  onError={(e) => {
                    e.target.src = FALLBACK_IMG;
                  }}
                />
                
                {/* Navigation Arrows */}
                {car.images && car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {car.images && car.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {car.images.length}
                  </div>
                )}

                {/* View All Images Button */}
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute bottom-4 left-4 bg-black/70 hover:bg-black/80 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <Eye size={16} />
                  Pogledaj sve slike
                </button>
              </div>

              {/* Thumbnail Strip */}
              {car.images && car.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image.url || FALLBACK_IMG}
                        alt={`${car.make} ${car.model} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = FALLBACK_IMG;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Specifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifikacije</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{car.year || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Godina</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Gauge className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{formatMileage(car.mileage)}</div>
                  <div className="text-sm text-gray-600">Kilometraža</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Fuel className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{car.fuel || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Gorivo</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{car.gearbox || car.transmission || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Mjenjač</div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Osnovni podaci</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Snaga:</span>
                      <span className="font-medium">{car.power || 'N/A'} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stanje:</span>
                      <span className="font-medium">{car.condition === 'USED' ? 'Rabljen' : car.condition || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tip karoserije:</span>
                      <span className="font-medium">{car.bodyType || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Broj vrata:</span>
                      <span className="font-medium">{car.doors || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Dodatni podaci</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Broj sjedala:</span>
                      <span className="font-medium">{car.seats || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Boja:</span>
                      <span className="font-medium">{car.color || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID oglasa:</span>
                      <span className="font-medium">{car.mobileAdId || car.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Oprema</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {car.description && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Opis</h2>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>
            )}
          </div>

          {/* Right Column - Price & Contact */}
          <div className="space-y-6">
            
            {/* Car Title & Price */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {car.make} {car.model}
                </h1>
                <p className="text-gray-600">{car.year} • {formatMileage(car.mileage)}</p>
              </div>

              <div className="text-4xl font-bold text-green-600 mb-6">
                {formatPrice(car.price)}
              </div>

              {/* Contact Seller */}
              {car.seller && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Kontakt</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{car.seller.name}</div>
                        <div className="text-sm text-gray-600">Prodavač</div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Phone size={20} />
                      {car.seller.phone || 'Pozovi'}
                    </button>
                    
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Mail size={20} />
                      Pošalji poruku
                    </button>
                  </div>

                  {car.seller.address && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        {car.seller.address}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Image */}
              <img
                src={car.images?.[selectedImageIndex]?.url || FALLBACK_IMG}
                alt={`${car.make} ${car.model}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Navigation */}
              {car.images && car.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <ChevronLeft size={32} className="text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <ChevronRight size={32} className="text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {car.images && car.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                  {selectedImageIndex + 1} / {car.images.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
