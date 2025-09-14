import React, {useEffect, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useParams, useNavigate} from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Phone,
  Mail,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Share2,
  Car,
  Palette,
  Cog,
  Shield,
  FileText,
  Zap,
  Info,
  Award,
  CheckCircle,
  FileText2
} from 'lucide-react'
import mobileApiService from '../services/mobileApiService'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&crop=center'

export default function CarDetails() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const result = await mobileApiService.fetchCarDetails(id)

        if (result && result.success && result.car) {
          setCar(result.car)
        } else {
          throw new Error('Fahrzeug nicht gefunden')
        }
      } catch (err) {
        console.error('Fehler beim Laden der Fahrzeugdetails:', err)
        setError('Fahrzeug konnte nicht geladen werden')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCarDetails()
      window.scrollTo(0, 0)
    }
  }, [id])

  console.log('car')
  console.log(car)

  // Image navigation
  const nextImage = () => {
    if (car?.images && car.images.length > 1) {
      setSelectedImageIndex((prev) => (prev + 1) % car.images.length)
    }
  }

  const prevImage = () => {
    if (car?.images && car.images.length > 1) {
      setSelectedImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
    }
  }

  // Format helpers
  const formatPrice = (priceObj) => {
    if (!priceObj) return 'Preis auf Anfrage'
    const price = priceObj.consumerPriceGross || priceObj.value || priceObj
    return `${price.toLocaleString('de-DE')} €`
  }

  const formatPriceNet = (priceObj) => {
    if (!priceObj || !priceObj.consumerPriceNet) return null
    return `${priceObj.consumerPriceNet.toLocaleString('de-DE')} €`
  }

  const formatMileage = (mileage) => {
    if (!mileage) return 'k.A.'
    return `${mileage.toLocaleString('de-DE')} km`
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center">
        <motion.div className="text-center" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-white">Fahrzeugdetails werden geladen...</h2>
          <p className="text-neutral-400 mt-2">Bitte haben Sie einen Moment Geduld</p>
        </motion.div>
      </div>
    )
  }

  // Error state
  if (error || !car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto p-8"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
        >
          <div className="text-red-400 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Fahrzeug nicht gefunden</h2>
          <p className="text-neutral-400 mb-6">
            {error || 'Das angeforderte Fahrzeug existiert nicht oder ist nicht verfügbar.'}
          </p>
          <button
            onClick={() => navigate('/cars')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Zurück zur Übersicht
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-neutral-800 to-black border-b border-neutral-700">
        <div className="container mx-auto px-6 py-6">
          <motion.button
            onClick={() => navigate('/cars')}
            className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors mb-4"
            whileHover={{x: -5}}
          >
            <ArrowLeft size={20} />
            <span>Zurück zur Übersicht</span>
          </motion.button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {car.make} {car.model}
              </h1>
              <p className="text-xl text-neutral-400">
                {car.year} • {formatMileage(car.mileage)} • {car.fuel}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-600 transition-colors"
              >
                <Heart size={24} className="text-neutral-400" />
              </motion.button>

              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-600 transition-colors"
              >
                <Share2 size={24} className="text-neutral-400" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-12 max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto xl:max-w-none xl:px-12">
          {/* Left Column - Images & Specs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-700"
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
            >
              {/* Main Image */}
              <div className="relative aspect-video bg-neutral-900 group">
                <img
                  src={car.images?.[selectedImageIndex]?.xxl || FALLBACK_IMG}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                  onClick={() => setShowImageModal(true)}
                  onError={(e) => {
                    e.target.src = FALLBACK_IMG
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Navigation Arrows */}
                {car.images && car.images.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300"
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.9}}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>

                    <motion.button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300"
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.9}}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}

                {/* Image Counter */}
                {car.images && car.images.length > 1 && (
                  <div className="absolute bottom-6 right-6 bg-black/70 text-white px-4 py-2 rounded-xl backdrop-blur-sm">
                    <span className="text-sm font-medium">
                      {selectedImageIndex + 1} / {car.images.length}
                    </span>
                  </div>
                )}

                {/* View Gallery Button */}
                <motion.button
                  onClick={() => setShowImageModal(true)}
                  className="absolute bottom-6 left-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-xl"
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                >
                  <Eye size={18} />
                  Galerie öffnen
                </motion.button>
              </div>

              {/* Thumbnail Gallery */}
              {car.images && car.images.length > 1 && (
                <div className="p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {car.images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          selectedImageIndex === index
                            ? 'border-red-500 ring-2 ring-red-500/30 scale-110'
                            : 'border-neutral-600 hover:border-neutral-400'
                        }`}
                        whileHover={{scale: selectedImageIndex === index ? 1.1 : 1.05}}
                        whileTap={{scale: 0.95}}
                      >
                        <img
                          src={image.xxl || FALLBACK_IMG}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = FALLBACK_IMG
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Vehicle Specifications */}
            <motion.div
              className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl border border-neutral-700"
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.1}}
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Car className="text-red-500" size={32} />
                Fahrzeugdetails
              </h2>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl border border-red-500/20">
                  <Calendar className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <div className="text-xl lg:text-2xl font-bold text-white break-words">{car.year || 'N/A'}</div>
                  <div className="text-sm text-neutral-400">Baujahr</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl border border-blue-500/20">
                  <Gauge className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-xl lg:text-2xl font-bold text-white break-words">{formatMileage(car.mileage)}</div>
                  <div className="text-sm text-neutral-400">Laufleistung</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl border border-green-500/20">
                  <Fuel className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-xl lg:text-2xl font-bold text-white break-words px-1">{car.fuel || 'N/A'}</div>
                  <div className="text-sm text-neutral-400">Kraftstoff</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-2xl border border-purple-500/20">
                  <Settings className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-xl lg:text-2xl font-bold text-white break-words hyphens-auto px-1">{car.gearbox || 'N/A'}</div>
                  <div className="text-sm text-neutral-400">Getriebe</div>
                </div>
              </div>

              {/* Detailed Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Technical Data */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Cog className="text-red-400" size={20} />
                    Technische Daten
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">Leistung:</span>
                      <span className="text-white font-medium break-words">{car.power ? `${car.power} kW` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">Hubraum:</span>
                      <span className="text-white font-medium break-words">
                        {car.cubicCapacity ? `${car.cubicCapacity} cm³` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exterior & Interior */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Palette className="text-red-400" size={20} />
                    Ausstattung
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">Außenfarbe:</span>
                      <span className="text-white font-medium break-words">{car.exteriorColor || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">Innenausstattung:</span>
                      <span className="text-white font-medium break-words">{car.interiorColor || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">Zustand:</span>
                      <span className="text-white font-medium break-words">{car.condition || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Vehicle Information */}
            {(car.consumption || car.emissionClass || car.co2Emission || car.fuelConsumption) && (
              <motion.div
                className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl border border-neutral-700"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
              >
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Zap className="text-green-500" size={32} />
                  Verbrauch & Umwelt
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {car.fuelConsumption && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Fuel className="text-green-400" size={18} />
                        Kraftstoffverbrauch
                      </h3>
                      <div className="space-y-2">
                        {car.fuelConsumption.city && (
                          <div className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-lg">
                            <span className="text-neutral-400">Stadt:</span>
                            <span className="text-white font-medium break-words">{car.fuelConsumption.city} l/100km</span>
                          </div>
                        )}
                        {car.fuelConsumption.highway && (
                          <div className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-lg">
                            <span className="text-neutral-400">Landstraße:</span>
                            <span className="text-white font-medium break-words">{car.fuelConsumption.highway} l/100km</span>
                          </div>
                        )}
                        {car.fuelConsumption.combined && (
                          <div className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-lg">
                            <span className="text-neutral-400">Kombiniert:</span>
                            <span className="text-white font-medium break-words">{car.fuelConsumption.combined} l/100km</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Shield className="text-green-400" size={18} />
                      Umweltdaten
                    </h3>
                    <div className="space-y-2">
                      {car.co2Emission && (
                        <div className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-lg">
                          <span className="text-neutral-400">CO₂-Emission:</span>
                          <span className="text-white font-medium break-words">{car.co2Emission} g/km</span>
                        </div>
                      )}
                      {car.emissionClass && (
                        <div className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-lg">
                          <span className="text-neutral-400">Schadstoffklasse:</span>
                          <span className="text-white font-medium break-words">{car.emissionClass}</span>
                        </div>
                      )}
                      {car.environmentalBadge && (
                        <div className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-lg">
                          <span className="text-neutral-400">Umweltplakette:</span>
                          <span className="text-white font-medium break-words">{car.environmentalBadge}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Equipment & Features */}
            {(car.features || car.equipment || car.safetyFeatures || car.comfortFeatures) && (
              <motion.div
                className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl border border-neutral-700"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3}}
              >
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Award className="text-blue-500" size={32} />
                  Ausstattung & Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Safety Features */}
                  {(car.safetyFeatures || car.features?.safety) && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="text-red-400" size={20} />
                        Sicherheit
                      </h3>
                      <div className="space-y-2">
                        {(car.safetyFeatures || car.features?.safety || []).map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-neutral-800/30 rounded-lg">
                            <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                            <span className="text-neutral-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comfort Features */}
                  {(car.comfortFeatures || car.features?.comfort || car.equipment) && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Settings className="text-blue-400" size={20} />
                        Komfort & Ausstattung
                      </h3>
                      <div className="space-y-2">
                        {(car.comfortFeatures || car.features?.comfort || car.equipment || []).map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-neutral-800/30 rounded-lg">
                            <CheckCircle size={16} className="text-blue-400 flex-shrink-0" />
                            <span className="text-neutral-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* General Features */}
                {car.features && Array.isArray(car.features) && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Info className="text-purple-400" size={20} />
                      Weitere Ausstattung
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-neutral-800/30 rounded-lg">
                          <CheckCircle size={16} className="text-purple-400 flex-shrink-0" />
                          <span className="text-neutral-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Document & Legal Information */}
            {(car.vehicleIdentificationNumber || car.firstRegistration || car.nextInspection || car.warranty || car.previousOwners) && (
              <motion.div
                className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl border border-neutral-700"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.4}}
              >
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <FileText className="text-yellow-500" size={32} />
                  Fahrzeugdokumente & Historie
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {car.vehicleIdentificationNumber && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Fahrgestellnummer:</span>
                        <span className="text-white font-medium font-mono break-all">{car.vehicleIdentificationNumber}</span>
                      </div>
                    )}
                    {car.firstRegistration && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Erstzulassung:</span>
                        <span className="text-white font-medium break-words">{car.firstRegistration}</span>
                      </div>
                    )}
                    {car.previousOwners !== undefined && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Vorbesitzer:</span>
                        <span className="text-white font-medium break-words">{car.previousOwners}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {car.nextInspection && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Nächste HU:</span>
                        <span className="text-white font-medium break-words">{car.nextInspection}</span>
                      </div>
                    )}
                    {car.warranty && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Garantie:</span>
                        <span className="text-white font-medium break-words">{car.warranty}</span>
                      </div>
                    )}
                    {car.accidentFree !== undefined && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Unfallfrei:</span>
                        <span className={`font-medium ${car.accidentFree ? 'text-green-400' : 'text-red-400'}`}>
                          {car.accidentFree ? 'Ja' : 'Nein'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Additional Technical Details */}
            {(car.weight || car.maxWeight || car.engineCode || car.batteryCapacity || car.range) && (
              <motion.div
                className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl border border-neutral-700"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
              >
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Cog className="text-orange-500" size={32} />
                  Weitere technische Daten
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {car.weight && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Leergewicht:</span>
                        <span className="text-white font-medium break-words">{car.weight} kg</span>
                      </div>
                    )}
                    {car.maxWeight && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Gesamtgewicht:</span>
                        <span className="text-white font-medium break-words">{car.maxWeight} kg</span>
                      </div>
                    )}
                    {car.engineCode && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Motorcode:</span>
                        <span className="text-white font-medium font-mono break-all">{car.engineCode}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {car.batteryCapacity && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Batteriekapazität:</span>
                        <span className="text-white font-medium">{car.batteryCapacity} kWh</span>
                      </div>
                    )}
                    {car.range && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Reichweite:</span>
                        <span className="text-white font-medium">{car.range} km</span>
                      </div>
                    )}
                    {car.chargingTime && (
                      <div className="flex justify-between items-center p-4 bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-400">Ladezeit:</span>
                        <span className="text-white font-medium">{car.chargingTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Price & Contact */}
          <div className="space-y-8">
            {/* Price Card */}
            <motion.div
              className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl border border-neutral-700 sticky top-8"
              initial={{opacity: 0, x: 30}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: 0.2}}
            >
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text mb-2">
                  {formatPrice(car.price)}
                </div>
                <p className="text-neutral-400 mb-2">Verkaufspreis (inkl. MwSt.)</p>
                {formatPriceNet(car.price) && (
                  <div className="text-lg text-neutral-500">
                    Nettopreis: {formatPriceNet(car.price)}
                  </div>
                )}
              </div>

              {/* Contact Seller */}
              {car.seller && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Kontakt</h3>

                  <div className="p-4 bg-neutral-800/50 rounded-xl">
                    <div className="text-white font-medium mb-1">{car.seller.name}</div>
                    {car.seller.address && (
                      <div className="text-neutral-400 text-sm flex items-start gap-2">
                        <MapPin size={14} className="mt-1 flex-shrink-0" />
                        <span>
                          {`${car.seller.address.street || ''}, ${car.seller.address.zipcode || ''} ${
                            car.seller.address.city || ''
                          }, ${car.seller.address.country || ''}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                    >
                      <Phone size={20} />
                      {car.seller.phone || 'Anrufen'}
                    </motion.button>

                    <motion.button
                      className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3"
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                    >
                      <Mail size={20} />
                      Nachricht senden
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative max-w-7xl max-h-full">
              {/* Close Button */}
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 bg-black/70 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image */}
              <img
                src={car.images?.[selectedImageIndex]?.xxl}
                alt={`${car.make} ${car.model} ${car.images?.[selectedImageIndex]?.xxl}`}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                onClick={() => setShowImageModal(true)}
                onError={(e) => {
                  e.target.src = FALLBACK_IMG
                }}
              />

              {/* Navigation */}
              {car.images && car.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft size={32} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight size={32} />
                  </button>

                  {/* Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-xl">
                    <span className="font-medium">
                      {selectedImageIndex + 1} / {car.images.length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
