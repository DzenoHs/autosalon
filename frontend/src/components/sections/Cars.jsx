import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {ChevronRight} from 'lucide-react'
import mobileApiService from '../../services/mobileApiService'

const Cars = () => {
  const navigate = useNavigate()
  const [topExpensiveCars, setTopExpensiveCars] = useState([])
  const [isLoadingExpensive, setIsLoadingExpensive] = useState(true)

  // Memoize API data mapping and state setting
  useEffect(() => {
    const fetchExpensiveCars = async () => {
      try {
        setIsLoadingExpensive(true)

        const data = await mobileApiService.fetchTopExpensiveCars()

        if (data.success && data.cars) {
          setTopExpensiveCars(data.cars)
        } else {
          console.log('⚠️ Nema podataka o najskupljim automobilima')
        }
      } catch (err) {
        console.error('❌ Fehler beim Laden der teuersten Fahrzeuge:', err)
      } finally {
        setIsLoadingExpensive(false)
      }
    }

    fetchExpensiveCars()
  }, [])

  // Memoize format functions
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('de-DE').format(price)
  }, [])

  const formatMileage = useCallback((mileage) => {
    if (!mileage) return 'k.A.'
    return `${Number(mileage).toLocaleString('de-DE')} km`
  }, [])

  const formatPower = useCallback((powerKw) => {
    if (!powerKw) return 'N/A'
    const ps = Math.round(powerKw * 1.35962)
    return `${powerKw}kW(${ps}PS)`
  }, [])

  const formatHU = useCallback((huDate) => {
    if (!huDate) return 'N/A'
    if (huDate.length === 6) {
      const year = huDate.substring(0, 4)
      const month = huDate.substring(4, 6)
      return `${month}/${year}`
    }
    return huDate
  }, [])

  const handleNavigate = useCallback(
    (id) => {
      navigate(`/car/${id}`)
    },
    [navigate]
  )

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
    <section id="cars" className="relative py-20 bg-gradient-to-b from-black via-neutral-900 to-black">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="text-white">Exklusive</span>
            <span className="text-white ml-4">Fahrzeuge</span>
          </h2>
        </div>

        {/* Cars Grid */}
        {topExpensiveCars.length === 0 && !isLoadingExpensive ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 opacity-60">🚗</div>
            <h3 className="text-3xl font-bold text-white mb-4">Fahrzeuge werden geladen</h3>
            <p className="text-white text-lg">Bitte haben Sie einen Moment Geduld...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
            {topExpensiveCars.map((car) => {
              const firstRegistrationFormatted = car.firstRegistration
                ? (() => {
                    const dateStr = car.firstRegistration.toString()
                    if (dateStr.length === 6) {
                      const year = dateStr.substring(0, 4)
                      const month = dateStr.substring(4, 6)
                      return `${month}/${year}`
                    }
                    return dateStr
                  })()
                : car.year
                ? `01/${car.year}`
                : 'N/A'

              const onCardClick = () => handleNavigate(car.mobileAdId)

              return (
                <div
                  key={car.mobileAdId}
                  className="group bg-white rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-red-500 hover:scale-105"
                  onClick={onCardClick}
                >
                  {/* Car Image */}
                  <div className="relative h-52 bg-black">
                    <img
                      src={car?.images[0].xxl}
                      alt={`${car.make} ${car.modelDescription}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Car Info */}
                  <div className="p-3 bg-white">
                    <h3 className="text-lg font-bold text-black group-hover:text-red-400 transition-colors mb-2 line-clamp-2">
                      {car.make} {car.modelDescription?.replace(/&amp;/g, '&').replace(/&quot;/g, '"')}
                    </h3>

                    {/* Car Details with compact rounded button-like styling */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 border border-gray-400">
                        <span className="font-medium">Erstzulassung:</span> {firstRegistrationFormatted}
                      </div>
                      <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 border border-gray-400">
                        <span className="font-medium">Kilometerstand:</span> {formatMileage(car.mileage)}
                      </div>
                      <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 border border-gray-400">
                        <span className="font-medium">Kraftstoff:</span> {car.fuel || 'N/A'}
                      </div>
                      <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 border border-gray-400 font-semibold">
                        {formatPower(car.power)}
                      </div>
                      <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 border border-gray-400">
                        <span className="font-medium">Getriebe:</span>{' '}
                        {car.gearbox === 'MANUAL_GEAR' ? 'Schaltgetriebe' : 'Automatik'}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="border-t border-gray-200 pt-2">
                      <div className="text-lg font-bold text-black mb-1">
                        €{formatPrice(car.price.consumerPriceGross)}{' '}
                        <span className="text-sm font-normal text-gray-600">Brutto</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        €{formatPrice(car.price.consumerPriceNet)} <span className="text-xs text-gray-500">Netto</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/cars')}
            className="group inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 
                       text-white px-8 py-4 rounded-lg font-semibold text-lg
                       transition-all duration-300 transform hover:scale-105
                       shadow-lg hover:shadow-xl"
          >
            <span>Alle Fahrzeuge anzeigen</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Cars)
