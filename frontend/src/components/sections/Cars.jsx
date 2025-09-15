import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {ChevronRight, Calendar, Gauge, Fuel, Settings, Eye} from 'lucide-react'

const Cars = () => {
  const navigate = useNavigate()
  const [hoveredCar, setHoveredCar] = useState(null)
  const [topExpensiveCars, setTopExpensiveCars] = useState([])
  const [isLoadingExpensive, setIsLoadingExpensive] = useState(true)
  const [error, setError] = useState(null)

  // Fetch top expensive cars from API
  useEffect(() => {
    const fetchTopExpensiveCars = async () => {
      try {
        setIsLoadingExpensive(true)

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cars/top/expensive`)
        const data = await response.json()

        if (data.success && data.cars) {
          // Map API data to component format
          const mappedExpensiveCars = data.cars.map((car, index) => ({
            id: car.mobileAdId || car.id || `expensive-car-${index}`,
            name: `${car.make} ${car.model}`,
            year: car.year,
            km: car.mileage || 0,
            priceNet: car.price?.value || car.price?.consumerPriceNet || 0,
            priceGross: car.price?.consumerPriceGross || (car.price?.value ? Math.round(car.price.value * 1.19) : 0),
            fuel: car.fuel || 'Unbekannt',
            gearbox: car.gearbox || 'Unbekannt',
            engine: `${car.power || 0} kW`,
            images: car.images,
            condition: car.condition || 'USED',
            category: 'premium'
          }))

          setTopExpensiveCars(mappedExpensiveCars)
          console.log('✅ Najskuplji automobili učitani:', mappedExpensiveCars.length)
        } else {
          console.log('⚠️ Nema podataka o najskupljim automobilima')
        }
      } catch (err) {
        console.error('❌ Fehler beim Laden der teuersten Fahrzeuge:', err)
        // Ne postavljamo grešku jer ovo nije kritično
      } finally {
        setIsLoadingExpensive(false)
      }
    }

    fetchTopExpensiveCars()
  }, [])

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`)
  }

  const handleViewAll = () => {
    navigate('/cars')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price)
  }

  if (isLoadingExpensive) {
    return (
      <section
        id="cars"
        className="relative py-32 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Laden automobila...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="cars"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden"
      style={{overflowX: 'hidden'}}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-500 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-red-600 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <span className="text-red-500 font-medium tracking-wider uppercase text-sm">Premium Auswahl</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Unsere
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Fahrzeuge
            </span>
          </h2>

          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie unsere exklusive Auswahl an Premium-Fahrzeugen. Jedes Auto wird sorgfältig geprüft und wartet
            darauf, Ihr neuer Begleiter zu werden.
          </p>
        </div>

        {/* Cars Grid */}
        {topExpensiveCars.length === 0 && !isLoadingExpensive ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 opacity-60">🚗</div>
            <h3 className="text-3xl font-bold text-white mb-4">Premium-Fahrzeuge werden geladen</h3>
            <p className="text-neutral-400 text-lg">Bitte haben Sie einen Moment Geduld...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {topExpensiveCars.map((car) => (
              <div
                key={car.id}
                className="group relative bg-gradient-to-br from-neutral-900/95 via-neutral-800/90 to-black/95 
                         rounded-3xl overflow-hidden backdrop-blur-sm
                         transform hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 cursor-pointer
                         border border-neutral-700/50 hover:border-red-500/40
                         shadow-2xl hover:shadow-3xl hover:shadow-red-500/20"
                onMouseEnter={() => setHoveredCar(car.id)}
                onMouseLeave={() => setHoveredCar(null)}
                onClick={() => handleCarClick(car.id)}
              >
                {/* Car Image */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={car?.images[0].xxl}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Premium Badge for expensive cars */}
                  <div
                    className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 
                              text-black px-3 py-2 rounded-xl text-xs font-bold shadow-xl backdrop-blur-sm
                              border border-yellow-300/50 flex items-center gap-1 animate-pulse"
                  >
                    <span className="text-sm animate-bounce">💎</span>
                    <span>PREMIUM</span>
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Car Details */}
                <div className="p-6 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors truncate">
                      {car.name}
                    </h3>
                    <div className="text-xs text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded-lg">{car.year}</div>
                  </div>

                  {/* Simple Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400 flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-red-400" />
                        {formatPrice(car.km)} km
                      </span>
                      <span className="text-neutral-400 flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-red-400" />
                        {car.fuel}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-neutral-400 text-sm flex items-center justify-center gap-2">
                        <Settings className="w-4 h-4 text-red-400" />
                        {car.gearbox}
                      </span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 rounded-xl p-4 mb-4 border border-neutral-600/30">
                    <div className="text-xs text-neutral-400 mb-2 text-center">Preise</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-400">Brutto:</span>
                        <span className="text-lg font-bold text-green-400">€{formatPrice(car.priceGross)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-400">Netto:</span>
                        <span className="text-2xl font-bold text-green-300 drop-shadow-lg">
                          €{formatPrice(car.priceNet)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-700/30">
                    <div className="flex flex-col">
                      <span className="text-xs text-neutral-400">Zustand</span>
                      <span className="text-sm font-medium text-white capitalize">
                        {car.condition?.replace('_', ' ').toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-red-400 font-medium text-sm group-hover:text-red-300 transition-colors">
                      <span>Details</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="group inline-flex items-center gap-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
                       hover:from-red-600 hover:via-red-700 hover:to-red-800 
                       text-white px-10 py-5 rounded-2xl font-semibold text-lg
                       transition-all duration-400 transform hover:scale-105 hover:-translate-y-1
                       shadow-2xl hover:shadow-3xl hover:shadow-red-500/30
                       border border-red-400/20 backdrop-blur-sm"
          >
            <span>Alle Fahrzeuge anzeigen</span>
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cars
