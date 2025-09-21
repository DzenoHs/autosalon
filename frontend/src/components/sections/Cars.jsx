import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {ChevronRight, Gauge, Fuel, Settings, Crown, Star, Award, Calendar} from 'lucide-react'
import mobileApiService from '../../services/mobileApiService'

const Cars = () => {
  const navigate = useNavigate()
  // const [hoveredCar, setHoveredCar] = useState(null)
  const [topExpensiveCars, setTopExpensiveCars] = useState([])
  const [isLoadingExpensive, setIsLoadingExpensive] = useState(true)
  // const [error, setError] = useState(null)

  // Fetch top expensive cars from API
  useEffect(() => {
    const fetchExpensiveCars = async () => {
      try {
        setIsLoadingExpensive(true)

        const data = await mobileApiService.fetchTopExpensiveCars()

        if (data.success && data.cars) {
          // Map API data to component format
          // const mappedExpensiveCars = data.cars.map((car, index) => ({
          //   id: car.mobileAdId || car.id || `expensive-car-${index}`,
          //   name: `${car.make} ${car.model}`,
          //   year: car.year,
          //   km: car.mileage || 0,
          //   priceNet: car.price?.value || car.price?.consumerPriceNet || 0,
          //   priceGross: car.price?.consumerPriceGross || (car.price?.value ? Math.round(car.price.value * 1.19) : 0),
          //   fuel: car.fuel || 'Unbekannt',
          //   gearbox: car.gearbox || 'Unbekannt',
          //   engine: `${car.power || 0} kW`,
          //   images: car.images,
          //   condition: car.condition || 'USED',
          //   category: 'premium'
          // }))

          setTopExpensiveCars(data.cars)
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

    fetchExpensiveCars()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price)
  }
  const formatMileage = (mileage) => {
    if (!mileage) return 'k.A.'
    return `${Number(mileage).toLocaleString('de-DE')} km`
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
      className="relative w-full h-full bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden flex items-center justify-center"
      style={{overflowX: 'hidden', minHeight: '100vh'}}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-3 h-3 bg-white rounded-full opacity-10"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-white rounded-full opacity-15"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-white rounded-full opacity-20"></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 py-8">
        {/* Simple Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            <span className="text-white">Premium</span>
            <span className="text-gray-300 ml-3">Fahrzeuge</span>
          </h2>
        </div>

        {/* Cars Grid */}
        {topExpensiveCars.length === 0 && !isLoadingExpensive ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3 opacity-60">🚗</div>
            <h3 className="text-xl font-bold text-white mb-2">Premium-Fahrzeuge werden geladen</h3>
            <p className="text-neutral-400 text-sm">Bitte haben Sie einen Moment Geduld...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {topExpensiveCars.map((car) => (
              <div
                key={car.mobileAdId}
                className="group relative bg-gradient-to-br from-neutral-900/98 via-neutral-800/95 to-black/98 
                         rounded-3xl overflow-hidden backdrop-blur-xl
                         transform hover:scale-[1.05] hover:-translate-y-4 transition-all duration-700 cursor-pointer
                         border border-neutral-600/60 hover:border-gradient-to-r hover:from-amber-400/60 hover:to-red-500/60
                         shadow-2xl hover:shadow-4xl hover:shadow-amber-500/30
                         before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-400/5 before:via-transparent before:to-red-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
                // onMouseEnter={() => setHoveredCar(car.id)}
                // onMouseLeave={() => setHoveredCar(null)}
                onClick={() => navigate(`/car/${car.mobileAdId}`)}
              >
                {/* Car Image */}
                <div className="relative h-40 overflow-hidden rounded-t-2xl">
                  <img
                    src={car?.images[0].xxl}
                    alt={car.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Premium Badge for expensive cars */}
                  <div
                    className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 
                              text-black px-2 py-1 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm
                              border border-amber-300/80 flex items-center gap-1"
                  >
                    <Crown className="w-3 h-3 text-black" />
                    <span>PREMIUM</span>
                  </div>

                  {/* Luxury corner decoration */}
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      <Star className="w-2 h-2 text-amber-300" />
                    </div>
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Car Details */}
                <div className="p-2 pt-2 relative z-10">
                  <div className="mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors truncate flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      {car.make} {car.modelDescription?.replace(/&amp;/g, '&')}
                    </h3>
                    <div className="text-xs text-amber-400 bg-gradient-to-r from-amber-900/60 to-yellow-900/60 px-2 py-1 rounded-lg font-semibold border border-amber-500/30">
                      {car.year}
                    </div>
                  </div>

                  {/* Compact Specifications */}
                  <div className="mb-2">
                    {/* Basic Info Row */}
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-center bg-neutral-800/60 rounded p-1 border border-neutral-600/30">
                        <Gauge className="w-3 h-3 text-amber-400 mx-auto mb-0.5" />
                        <div className="text-xs text-neutral-300 font-medium">{formatMileage(car.mileage)}</div>
                        <div className="text-xs text-neutral-500">Kilometraza</div>
                      </div>
                      <div className="text-center bg-neutral-800/60 rounded px-1 py-0.5 border border-neutral-600/30">
                        <Fuel className="w-2.5 h-2.5 text-red-400 mx-auto mb-0.5" />
                        <div className="text-xs text-neutral-300 font-medium">{car.fuel}</div>
                      </div>
                      <div className="text-center bg-neutral-800/60 rounded px-1 py-0.5 border border-neutral-600/30">
                        <Settings className="w-2.5 h-2.5 text-blue-400 mx-auto mb-0.5" />
                        <div className="text-xs text-neutral-300 font-medium">
                          {car.gearbox?.replace('_GEAR', '') || 'AUTO'}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info Row with Year */}
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <div className="text-center bg-gradient-to-r from-red-900/40 to-red-800/40 rounded p-1 border border-red-500/20">
                        <div className="text-xs text-red-300 font-bold">
                          {car.year || (car.firstRegistration ? car.firstRegistration.substring(0, 4) : 'N/A')}
                        </div>
                        <div className="text-xs text-red-400">Baujahr</div>
                      </div>
                      <div className="text-center bg-neutral-800/60 rounded p-1 border border-neutral-600/30">
                        <div className="text-xs text-neutral-300 font-medium text-center">
                          {car.power ? `${car.power} kW` : 'N/A'}
                        </div>
                        <div className="text-xs text-neutral-500 text-center">Leistung</div>
                      </div>
                    </div>
                  </div>

                  {/* Compact Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-neutral-600/30">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 px-2 py-1 rounded-lg flex items-center gap-1 text-white font-medium text-xs">
                      <span>Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-emerald-400 font-bold">
                        €{formatPrice(car.price.consumerPriceGross)}
                      </div>
                      <div className="text-xs text-neutral-400">Netto: €{formatPrice(car.price?.consumerPriceNet)}</div>
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
            onClick={() => navigate('/cars')}
            className="group inline-flex items-center gap-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 
                       hover:from-red-600 hover:via-red-700 hover:to-red-800 
                       text-white px-6 py-3 rounded-xl font-semibold text-sm
                       transition-all duration-300 transform hover:scale-105
                       shadow-xl hover:shadow-red-500/20
                       border border-red-400/20"
          >
            <span>Alle Fahrzeuge anzeigen</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cars
