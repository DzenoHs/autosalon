import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaFilter, FaSearch, FaEye, FaHeart, FaShare} from 'react-icons/fa'
import mobileApiService from '../services/mobileApiService'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&crop=center'

export default function CarsPage() {
  const navigate = useNavigate()

  // State for cars and pagination
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(15) // Default page size
  const [total, setTotal] = useState(0)
  const [maxPages, setMaxPages] = useState(1)

  // UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true)
        setError(null)

        console.log('🔄 Fetching cars from API...')
        const result = await mobileApiService.fetchCarsFromMobileApi(currentPage, pageSize)
        console.log('result in fetchCars')
        console.log(result)
        console.log('✅ Cars fetched successfully:', result)
        setCars(result.ads)
        setTotal(result.total)
        setMaxPages(result.maxPages)
      } catch (err) {
        console.log(err)
        console.error('❌ Error fetching cars:', err)
        setError('Failed to load cars. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [currentPage, pageSize]) // Refetch cars when currentPage or pageSize changes

  // Handle car click
  const handleCarClick = (car) => {
    navigate(`/car/${car.mobileAdId || car.id}`)
  }

  // Format price
  const formatPrice = (price) => {
    if (!price || price === 0) return 'Preis auf Anfrage'
    return `${price.toLocaleString('de-DE')} €`
  }

  // Format mileage
  const formatMileage = (mileage) => {
    if (!mileage) return 'k.A.'
    return `${mileage.toLocaleString('de-DE')} km`
  }

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Fahrzeuge</h1>
                <p className="text-gray-300 mt-1">
                  Seite {currentPage} von {maxPages} ({cars.length} von {total} Fahrzeugen angezeigt)
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Fahrzeuge suchen..."
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
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-300">Fahrzeuge werden geladen...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-6 mb-6">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {/* Cars Grid */}
            {!isLoading && cars.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {cars.map((car) => (
                    <div
                      key={car.mobileAdId || car.id}
                      onClick={() => handleCarClick(car)}
                      className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-700 hover:border-blue-500"
                    >
                      {/* Car Image */}
                      <div className="relative h-48 bg-gray-700">
                        <img
                          src={car.images?.[0]?.xxl || FALLBACK_IMG}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Car Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {car.year} • {formatMileage(car.mileage)}
                        </p>
                        <div className="text-2xl font-bold text-green-400 mt-2">
                          {formatPrice(car.price.consumerPriceGross)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  >
                    Vorherige
                  </button>
                  <span className="text-white">
                    Seite {currentPage} von {maxPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === maxPages}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  >
                    Nächste
                  </button>
                </div>
              </>
            )}

            {/* No Results */}
            {!isLoading && cars.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-lg font-medium text-white mb-2">Keine Fahrzeuge gefunden</h3>
                <p className="text-gray-400">Versuchen Sie, die Filter oder Suche zu ändern</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
