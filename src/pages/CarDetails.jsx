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
    { label: 'Startseite', path: '/', icon: Home },
    { label: 'Fahrzeuge', path: '/cars' },
    { label: car ? `${car.make} ${car.model}` : 'Details', path: '#', active: true }
  ];

  // Učitaj car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`🔍 Lade Fahrzeugdetails ID: ${id}`);

        // Prvo pokušaj pronaći auto u lokalnom cache-u
        // let foundCar = allCars.find(car => 
        //   (car.mobileAdId && car.mobileAdId === id) || 
        //   (car.id && car.id === id)
        // );

        // if (foundCar) {
        //   console.log('✅ Fahrzeug im Cache gefunden:', foundCar);
        //   console.log('🖼️ Anzahl Bilder:', foundCar.images?.length || 0, foundCar.images);
          
        //   setCar(foundCar);
        //   setLoading(false);
        //   return;
        // }

        // Falls nicht im Cache, lade direkt aus der Mobile.de API
        console.log('🔄 Lade Fahrzeugdetails aus Mobile.de API für ID:', id);
        try {
          const result = await mobileApiService.fetchCarDetails(id);

          console.log("result fetch car details")
          console.log(result)
          
          if (result && result.success && result.car) {
            console.log('✅ Fahrzeugdetails erfolgreich aus der API geladen:', result.car);
            console.log('🖼️ Anzahl Bilder aus API:', result.car.images?.length || 0, result.car.images);
            
            setCar(result.car);
          } else {
            console.log('⚠️ Keine Fahrzeugdaten von der API erhalten:', result);
            throw new Error('Fahrzeug nicht in der Mobile.de API gefunden');
          }
        } catch (apiError) {
          console.error('❌ Fehler beim Laden aus Mobile.de API:', apiError);
          throw new Error('Fahrzeug konnte nicht geladen werden. Bitte versuchen Sie es später erneut.');
        }
        
      } catch (err) {
        console.error('❌ Fehler beim Laden der Fahrzeugdetails:', err);
        setError('Fehler beim Abrufen der Fahrzeugdaten');
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
    if (!priceObj) return 'Preis auf Anfrage';
    const price = priceObj.consumerPriceGross || priceObj.value || priceObj;
    return `${price.toLocaleString('de-DE')} €`;
  };

  const formatMileage = (mileage) => {
    if (!mileage) return 'k.A.';
    return `${mileage.toLocaleString('de-DE')} km`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-300">Lade Fahrzeugdetails...</h2>
        </div>
      </div>
    );
  }  // Error state
  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Fahrzeug nicht gefunden</h1>
          <p className="text-gray-400 mb-6">{error || 'Das gesuchte Fahrzeug existiert nicht oder wurde entfernt.'}</p>
          <button 
            onClick={handleGoBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="inline mr-2" size={20} />
            Zurück zur Liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700 sticky top-0 z-40">
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
                      <span className="text-blue-400 font-medium truncate max-w-32">{item.label}</span>
                    ) : (
                      <button 
                        onClick={() => navigate(item.path)}
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1"
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
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Zurück zur Liste
              </button>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFavorite ? 'bg-red-900 text-red-400' : 'bg-gray-700 text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:text-blue-400 transition-colors">
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
            <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-700">
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-800 text-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-800 text-white p-2 rounded-full shadow-lg transition-colors"
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
                  Alle Bilder anzeigen
                </button>
              </div>

              {/* Thumbnail Strip */}
              {car.images && car.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {car.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-18 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImageIndex === index 
                            ? 'border-blue-400 ring-2 ring-blue-400/50 scale-105' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        title={image.alt || `Bild ${index + 1}`}
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
                  <p className="text-center text-gray-400 text-sm mt-2">
                    {car.images.length} Bilder verfügbar
                  </p>
                </div>
              )}
            </div>

            {/* Car Specifications */}
            <div className="bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Technische Daten</h2>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{car.year || 'N/A'}</div>
                  <div className="text-sm text-gray-300">Erstzulassung</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-green-900 to-green-800 rounded-lg">
                  <Gauge className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatMileage(car.mileage)}</div>
                  <div className="text-sm text-gray-300">Kilometerstand</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg">
                  <Fuel className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{car.fuel || 'N/A'}</div>
                  <div className="text-sm text-gray-300">Kraftstoff</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg">
                  <Settings className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{car.gearbox || 'N/A'}</div>
                  <div className="text-sm text-gray-300">Getriebe</div>
                </div>
              </div>

              {/* Detailed Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Motor & Performance */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white text-lg border-b border-gray-600 pb-2">Motor & Leistung</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Leistung:</span>
                      <span className="font-medium text-gray-200">{car.power ? `${car.power} kW (${Math.round(car.power * 1.36)} PS)` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hubraum:</span>
                      <span className="font-medium text-gray-200">{car.cubicCapacity ? `${car.cubicCapacity} cm³` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kraftstoff:</span>
                      <span className="font-medium text-gray-200">{car.fuel || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Antrieb:</span>
                      <span className="font-medium text-gray-200">{car.driveType === 'ALL_WHEEL' ? 'Allrad' : car.driveType || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Getriebe:</span>
                      <span className="font-medium text-gray-200">{car.gearbox || 'N/A'}</span>
                    </div>
                    {car.emissions?.combined?.co2 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">CO₂-Emission:</span>
                        <span className="font-medium text-gray-200">{car.emissions.combined.co2} g/km</span>
                      </div>
                    )}
                    {car.consumptions?.fuel?.combined && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Verbrauch:</span>
                        <span className="font-medium text-gray-200">{car.consumptions.fuel.combined} l/100km</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exterior & Interior */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white text-lg border-b border-gray-600 pb-2">Ausstattung</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Zustand:</span>
                      <span className="font-medium text-gray-200">{car.condition || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Außenfarbe:</span>
                      <span className="font-medium text-gray-200">
                        {car.exteriorColor || 'N/A'}
                        {car.metallic && <span className="text-yellow-400 ml-1">✨ Metallic</span>}
                      </span>
                    </div>
                    {car.manufacturerColorName && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Farbname:</span>
                        <span className="font-medium text-gray-200">{car.manufacturerColorName}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Innenausstattung:</span>
                      <span className="font-medium text-gray-200">{car.interiorColor || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Innentyp:</span>
                      <span className="font-medium text-gray-200">{car.interiorType || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Türen:</span>
                      <span className="font-medium text-gray-200">{car.doors || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sitzplätze:</span>
                      <span className="font-medium text-gray-200">{car.seats || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* History & Documents */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white text-lg border-b border-gray-600 pb-2">Historie & Dokumente</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vorbesitzer:</span>
                      <span className="font-medium text-gray-200">{car.numberOfPreviousOwners || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Scheckheft:</span>
                      <span className={`font-medium ${car.fullServiceHistory ? 'text-green-400' : 'text-red-400'}`}>
                        {car.fullServiceHistory ? '✓ Gepflegt' : '✗ Unbekannt'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Unfallschäden:</span>
                      <span className={`font-medium ${!car.damageUnrepaired ? 'text-green-400' : 'text-red-400'}`}>
                        {!car.damageUnrepaired ? '✓ Unfallfrei' : '⚠ Vorhanden'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Verkehrstauglich:</span>
                      <span className={`font-medium ${car.roadworthy ? 'text-green-400' : 'text-red-400'}`}>
                        {car.roadworthy ? '✓ Ja' : '✗ Nein'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Umweltplakette:</span>
                      <span className="font-medium text-gray-200">{car.emissionSticker?.replace('EMISSIONSSTICKER_', '') || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Abgasnorm:</span>
                      <span className="font-medium text-gray-200">{car.emissionClass || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fahrzeug-ID:</span>
                      <span className="font-medium text-gray-200 text-xs">{car.mobileAdId || car.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment & Features */}
            <div className="bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Ausstattung & Extras</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Safety Features */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    Sicherheit
                  </h3>
                  <div className="space-y-2 text-sm">
                    {car.abs && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">ABS (Antiblockiersystem)</span>
                      </div>
                    )}
                    {car.esp && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">ESP (Elektronisches Stabilitätsprogramm)</span>
                      </div>
                    )}
                    {car.airbag && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Airbags ({car.airbag.replace(/_/g, ' ').toLowerCase()})</span>
                      </div>
                    )}
                    {car.immobilizer && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Wegfahrsperre</span>
                      </div>
                    )}
                    {car.alarmSystem && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Alarmanlage</span>
                      </div>
                    )}
                    {car.tirePressureMonitoring && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Reifendruckkontrolle</span>
                      </div>
                    )}
                    {car.emergencyCallSystem && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Notrufsystem</span>
                      </div>
                    )}
                    {car.isofix && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">ISOFIX</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comfort Features */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    Komfort
                  </h3>
                  <div className="space-y-2 text-sm">
                    {car.climatisation && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Klimaanlage ({car.climatisation.replace(/_/g, ' ').toLowerCase()})</span>
                      </div>
                    )}
                    {car.electricWindows && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Elektrische Fensterheber</span>
                      </div>
                    )}
                    {car.centralLocking && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Zentralverriegelung</span>
                      </div>
                    )}
                    {car.electricAdjustableSeats && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Elektrische Sitzverstellung</span>
                      </div>
                    )}
                    {car.electricHeatedSeats && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Sitzheizung</span>
                      </div>
                    )}
                    {car.lumbarSupport && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Lordosenstütze</span>
                      </div>
                    )}
                    {car.armRest && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Armlehne</span>
                      </div>
                    )}
                    {car.ambientLighting && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Ambientebeleuchtung</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technology Features */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    Technologie
                  </h3>
                  <div className="space-y-2 text-sm">
                    {car.onBoardComputer && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Bordcomputer</span>
                      </div>
                    )}
                    {car.bluetooth && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Bluetooth</span>
                      </div>
                    )}
                    {car.handsFreePhoneSystem && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Freisprecheinrichtung</span>
                      </div>
                    )}
                    {car.touchscreen && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Touchscreen</span>
                      </div>
                    )}
                    {car.carplay && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Apple CarPlay</span>
                      </div>
                    )}
                    {car.androidAuto && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Android Auto</span>
                      </div>
                    )}
                    {car.digitalCockpit && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Digitales Cockpit</span>
                      </div>
                    )}
                    {car.voiceControl && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Sprachsteuerung</span>
                      </div>
                    )}
                    {car.wirelessCharging && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Induktives Laden</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Fahrzeugbeschreibung</h2>
              {car.description || car.plainTextDescription ? (
                <div className="prose max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {car.description || car.plainTextDescription || 'Keine Beschreibung verfügbar.'}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Car className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Für dieses Fahrzeug liegt keine detaillierte Beschreibung vor.</p>
                  <p className="text-sm mt-2">Kontaktieren Sie uns für weitere Informationen.</p>
                </div>
              )}

              {/* Highlights */}
              {car.highlights && car.highlights.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <h3 className="font-bold text-white mb-3">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.highlights.map((highlight, index) => (
                      <span 
                        key={index} 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Model Description */}
              {car.modelDescription && car.modelDescription !== car.description && (
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <h3 className="font-bold text-white mb-3">Modellbeschreibung</h3>
                  <p className="text-gray-300 italic">{car.modelDescription}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Price & Contact */}
          <div className="space-y-6">
            
            {/* Car Title & Price */}
            <div className="bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {car.make} {car.model}
                </h1>
                <p className="text-gray-400">{car.year} • {formatMileage(car.mileage)}</p>
              </div>

              <div className="text-4xl font-bold text-green-400 mb-6">
                {formatPrice(car.price)}
              </div>

              {/* Contact Seller */}
              {car.seller && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Kontakt</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{car.seller.name}</div>
                        <div className="text-sm text-gray-400">Verkäufer</div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Phone size={20} />
                      {car.seller.phone || 'Anrufen'}
                    </button>
                    
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Mail size={20} />
                      Nachricht senden
                    </button>
                  </div>

                  {car.seller.address && (
                    <div className="pt-4 border-t border-gray-600">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
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

              {/* Image Counter & Thumbnails */}
              {car.images && car.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-full">
                    {selectedImageIndex + 1} / {car.images.length}
                  </div>
                  
                  {/* Thumbnail Navigation in Modal */}
                  <div className="flex gap-2 overflow-x-auto max-w-screen-sm">
                    {car.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setSelectedImageIndex(index); 
                        }}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-white ring-2 ring-white/50' 
                            : 'border-white/30 hover:border-white/60'
                        }`}
                      >
                        <img
                          src={image.url || FALLBACK_IMG}
                          alt={`Bild ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = FALLBACK_IMG;
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
