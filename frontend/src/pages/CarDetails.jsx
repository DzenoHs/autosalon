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
    return `${Number(price).toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €`
  }

  const formatPriceNet = (priceObj) => {
    if (!priceObj || !priceObj.consumerPriceNet) return null
    return `${Number(priceObj.consumerPriceNet).toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} €`
  }

  const formatMileage = (mileage) => {
    if (!mileage) return 'k.A.'
    return `${Number(mileage).toLocaleString('de-DE')} km`
  }

  const formatRegistrationDate = (dateStr) => {
    if (!dateStr) return 'k.A.'
    
    // Handle YYYYMM format like "201903"
    if (dateStr.length === 6 && /^\d{6}$/.test(dateStr)) {
      const year = dateStr.substring(0, 4)
      const month = dateStr.substring(4, 6)
      const monthNames = [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
      ]
      const monthIndex = parseInt(month) - 1
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${monthNames[monthIndex]} ${year}`
      }
    }
    
    // Return as is if not in expected format
    return dateStr
  }

  // Format description text
  const formatDescription = (description) => {
    if (!description) return null

    // Split by \* and \\ markers and clean up
    const items = description
      .split(/\\?\*/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && item !== '\\')
      .map((item) => {
        // Clean up extra backslashes and formatting
        return item.replace(/\\+/g, '').trim()
      })
      .filter((item) => item.length > 0)

    return items
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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-red-600">
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
      <div className="w-full px-2 sm:px-6 py-6 sm:py-12 max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-12 w-full px-2 sm:px-12">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
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
              {/* Price Display */}
              <div className="space-y-4 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    27.999,00 €
                  </div>
                  <div className="text-lg text-neutral-300 font-medium">
                    Nettopreis: 23.528,57 €
                  </div>
                </div>
                
                {/* Financing hint */}
                <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-lg text-center">
                  <div className="text-xs text-red-300">💰 Finanzierung möglich</div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>

                <div className="p-4 bg-neutral-800/50 rounded-xl space-y-3">
                  <div className="text-white font-semibold text-lg">Autohausmiftari</div>
                  <div className="text-neutral-300 text-sm leading-relaxed">
                    Niestetalstr. 11, 34266 Niestetal-Heiligenrode bei Kassel, DE
                  </div>
                  <div className="flex items-center gap-2 text-red-400 font-medium">
                    <Phone size={16} />
                    <span>+49 174 7692697</span>
                  </div>
                </div>

                  <div className="space-y-3">
                    <motion.button
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-xl text-sm sm:text-base"
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                      onClick={() => {
                        window.location.href = `tel:+4917476926697`
                      }}
                    >
                      <Phone size={20} />
                      +49 174 7692697
                    </motion.button>

                    <motion.button
                      className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 text-sm sm:text-base"
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                      onClick={() => {
                        if (car.seller.email) {
                          const subject = encodeURIComponent(`Anfrage zu ${car.make} ${car.model}`)
                          const body = encodeURIComponent(
                            `Hallo,\n\nich interessiere mich für Ihr Fahrzeug:\n${car.make} ${car.model}\nPreis: ${
                              formatPriceNet(car.price) || formatPrice(car.price)
                            }\n\nBitte kontaktieren Sie mich für weitere Informationen.\n\nMit freundlichen Grüßen`
                          )
                          window.location.href = `mailto:${car.seller.email}?subject=${subject}&body=${body}`
                        }
                      }}
                    >
                      <Mail size={20} />
                      Nachricht senden
                    </motion.button>
                  </div>
                </div>
            </motion.div>
          </div>
        </div>

        {/* Full Width Fahrzeugdetails Section */}
        <motion.div
          className="w-full px-4 md:px-8 lg:px-12 mt-8"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.1}}
        >
          <div className="bg-neutral-900 rounded-xl p-4 md:p-6 border border-red-600/30">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-600 rounded"></span>
              Fahrzeugdetails
            </h2>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <div className="text-center p-2 sm:p-3 bg-black/40 rounded-lg border border-red-600/20">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-sm sm:text-lg font-bold text-white">{car.year || 'N/A'}</div>
                <div className="text-xs text-neutral-400">Baujahr</div>
              </div>

              <div className="text-center p-2 sm:p-3 bg-black/40 rounded-lg border border-red-600/20">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-sm sm:text-lg font-bold text-white">{formatMileage(car.mileage)}</div>
                <div className="text-xs text-neutral-400">Laufleistung</div>
              </div>

              <div className="text-center p-2 sm:p-3 bg-black/40 rounded-lg border border-red-600/20">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-sm sm:text-lg font-bold text-white">{car.fuel || 'N/A'}</div>
                <div className="text-xs text-neutral-400">Kraftstoff</div>
              </div>

              <div className="text-center p-2 sm:p-3 bg-black/40 rounded-lg border border-red-600/20">
                <Cog className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-sm sm:text-lg font-bold text-white">{car.gearbox || 'N/A'}</div>
                <div className="text-xs text-neutral-400">Getriebe</div>
              </div>

              <div className="text-center p-2 sm:p-3 bg-black/40 rounded-lg border border-red-600/20">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-sm sm:text-lg font-bold text-white">{car.power ? `${car.power} kW` : 'N/A'}</div>
                <div className="text-xs text-neutral-400">Leistung</div>
              </div>

              <div className="text-center p-2 sm:p-3 bg-black/40 rounded-lg border border-red-600/20">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-sm sm:text-lg font-bold text-white">
                  {car.cubicCapacity ? `${car.cubicCapacity} cm³` : 'N/A'}
                </div>
                <div className="text-xs text-neutral-400">Hubraum</div>
              </div>
            </div>

            {/* Detailed Specs */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Technical Data */}
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 rounded"></span>
                  Technische Daten
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Leistung:</span>
                    <span className="text-white">{car.power ? `${car.power} kW` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Hubraum:</span>
                    <span className="text-white">{car.cubicCapacity ? `${car.cubicCapacity} cm³` : 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Ausstattung */}
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 rounded"></span>
                  Ausstattung
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Außenfarbe:</span>
                    <span className="text-white">{car.exteriorColor || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Innenausstattung:</span>
                    <span className="text-white">{car.interiorColor || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Zustand:</span>
                    <span className="text-white">{car.condition || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-600 rounded"></span>
                  Zusätzliche Info
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Getriebe:</span>
                    <span className="text-white">{car.gearbox || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Kraftstoff:</span>
                    <span className="text-white">{car.fuel || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Laufleistung:</span>
                    <span className="text-white">{formatMileage(car.mileage)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Environmental Data Section */}
            {(car.consumption || car.emissionClass || car.co2Emission || car.fuelConsumption || car.firstRegistration || car.weight) && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Environmental Data */}
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-red-600 rounded"></span>
                    Verbrauch & Umwelt
                  </h3>
                  <div className="space-y-2">
                    {car.emissionClass && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Schadstoffklasse:</span>
                        <span className="text-white">{car.emissionClass}</span>
                      </div>
                    )}
                    {car.co2Emission && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">CO₂-Emission:</span>
                        <span className="text-white">{car.co2Emission} g/km</span>
                      </div>
                    )}
                    {car.fuelConsumption?.combined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Verbrauch komb.:</span>
                        <span className="text-white">{car.fuelConsumption.combined} l/100km</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents & Technical Data */}
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-red-600 rounded"></span>
                    Fahrzeugdokumente & Historie
                  </h3>
                  <div className="space-y-2">
                    {car.firstRegistration && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Erstzulassung:</span>
                        <span className="text-white">{formatRegistrationDate(car.firstRegistration)}</span>
                      </div>
                    )}
                    {car.weight && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Leergewicht:</span>
                        <span className="text-white">{car.weight} kg</span>
                      </div>
                    )}
                    {car.previousOwners !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Vorbesitzer:</span>
                        <span className="text-white">{car.previousOwners}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Full Width Description Section */}
        {car.description && (
          <motion.div
            className="w-full px-4 md:px-8 lg:px-12 mt-8"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3}}
          >
            <div className="bg-neutral-900 rounded-xl p-4 md:p-6 border border-red-600/30">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded"></span>
                Ausstattung
              </h2>
              <div className="bg-black/30 rounded-lg p-4">
                {formatDescription(car.description) ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {formatDescription(car.description).map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-1 flex-shrink-0 text-xs">•</span>
                        <span className="text-neutral-300 leading-snug break-words">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-neutral-300 text-sm">{car.description}</span>
                )}
              </div>
            </div>
          </motion.div>
        )}


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
