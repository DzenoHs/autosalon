import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaFilter, FaSearch, FaEye, FaHeart, FaShare, FaHome, FaTimes} from 'react-icons/fa'
import mobileApiService from '../services/mobileApiService'
import FilterPanel from '../components/ui/FilterPanel'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&crop=center'

export default function CarsPage() {
  const navigate = useNavigate()

  // State for cars and pagination
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(16) // Default page size
  const [total, setTotal] = useState(0)
  const [maxPages, setMaxPages] = useState(1)

  // UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter state (compat with FilterPanel)
  const [filters, setFilters] = useState({
      vehicleType: '',
      make: '',
      model: '',
      yearFrom: '',
      yearTo: '',
      priceFrom: '',
      priceTo: '',
      mileageMax: '',
      condition: '',
      location: '',
      seats: '',
      fuel: '',
      powerMin: '',
      powerMax: '',
      co2Max: '',
      emissionStandard: '',
      consumptionMax: '',
      transmission: '',
      drive: '',
      exteriorColor: '',
      interiorColor: '',
      airConditioning: false,
      navigation: false,
      parkingSensors: false,
      registrationType: '',
      doors: '',
      ownershipTransfer: '',
      buyNow: false
    })

  // All cars (za generiranje filter opcija)
  const [allCars, setAllCars] = useState([])
  const [displayedCars, setDisplayedCars] = useState([])

  // Reset filters function
  const resetFilters = () => {
    const emptyFilters = {
      make: '',
      model: '',
      priceFrom: '',
      priceTo: '',
      yearFrom: '',
      yearTo: '',
      fuel: '',
      transmission: '',
      vehicleType: '',
      mileageMax: '',
      condition: '',
      location: '',
      seats: '',
      powerMin: '',
      powerMax: '',
      co2Max: '',
      emissionStandard: '',
      consumptionMax: '',
      drive: '',
      exteriorColor: '',
      interiorColor: '',
      airConditioning: false,
      navigation: false,
      parkingSensors: false,
      registrationType: '',
      doors: '',
      ownershipTransfer: '',
      buyNow: false
    }
    setFilters(emptyFilters)
    setDisplayedCars(cars)
  }



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
        // Čuvaj sve automobile za filtriranje (samo na prvoj stranici)
        if (currentPage === 1) {
          setAllCars(result.ads)
        } else {
          setAllCars((prev) => [...prev, ...result.ads])
        }

        setDisplayedCars(result.ads)
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
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = []
    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(maxPages, currentPage + 2)

    // Add first page if not in range
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push('...')
    }

    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add last page if not in range
    if (endPage < maxPages) {
      if (endPage < maxPages - 1) pages.push('...')
      pages.push(maxPages)
    }

    return pages
  }

  // Handle filter change
  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  // Apply filters - expanded for FilterPanel compatibility
  const applyFilters = (currentFilters) => {
    if (!cars || cars.length === 0) {
      setDisplayedCars([])
      return
    }
    let filtered = cars

    // Osnovni filteri
    if (currentFilters.vehicleType) {
      filtered = filtered.filter(car => car.category?.toLowerCase().includes(currentFilters.vehicleType.toLowerCase()))
    }
    if (currentFilters.make) {
      filtered = filtered.filter(car => car.make?.toLowerCase().includes(currentFilters.make.toLowerCase()))
    }
    if (currentFilters.model) {
      filtered = filtered.filter(car => car.model?.toLowerCase().includes(currentFilters.model.toLowerCase()))
    }
    if (currentFilters.yearFrom) {
      filtered = filtered.filter(car => car.year >= parseInt(currentFilters.yearFrom))
    }
    if (currentFilters.yearTo) {
      filtered = filtered.filter(car => car.year <= parseInt(currentFilters.yearTo))
    }
    if (currentFilters.priceFrom) {
      filtered = filtered.filter(car => {
        const price = car.price?.consumerPriceGross || car.price?.consumerPriceNet || car.price?.value
        return price >= parseInt(currentFilters.priceFrom)
      })
    }
    if (currentFilters.priceTo) {
      filtered = filtered.filter(car => {
        const price = car.price?.consumerPriceGross || car.price?.consumerPriceNet || car.price?.value
        return price <= parseInt(currentFilters.priceTo)
      })
    }
    if (currentFilters.mileageMax) {
      filtered = filtered.filter(car => car.mileage <= parseInt(currentFilters.mileageMax))
    }
    if (currentFilters.condition) {
      filtered = filtered.filter(car => car.condition?.toLowerCase().includes(currentFilters.condition.toLowerCase()))
    }
    if (currentFilters.location) {
      filtered = filtered.filter(car => car.location?.toLowerCase().includes(currentFilters.location.toLowerCase()))
    }
    if (currentFilters.seats) {
      filtered = filtered.filter(car => car.seats?.toString() === currentFilters.seats)
    }

    // Tehnički filteri
    if (currentFilters.fuel) {
      filtered = filtered.filter(car => car.fuel?.toLowerCase().includes(currentFilters.fuel.toLowerCase()))
    }
    if (currentFilters.powerMin) {
      filtered = filtered.filter(car => car.power >= parseInt(currentFilters.powerMin))
    }
    if (currentFilters.powerMax) {
      filtered = filtered.filter(car => car.power <= parseInt(currentFilters.powerMax))
    }
    if (currentFilters.co2Max) {
      filtered = filtered.filter(car => car.co2 <= parseFloat(currentFilters.co2Max))
    }
    if (currentFilters.emissionStandard) {
      filtered = filtered.filter(car => car.emissionStandard?.toLowerCase().includes(currentFilters.emissionStandard.toLowerCase()))
    }
    if (currentFilters.consumptionMax) {
      filtered = filtered.filter(car => car.consumption <= parseFloat(currentFilters.consumptionMax))
    }
    if (currentFilters.transmission) {
      filtered = filtered.filter(car => car.gearbox?.toLowerCase().includes(currentFilters.transmission.toLowerCase()))
    }
    if (currentFilters.drive) {
      filtered = filtered.filter(car => car.drive?.toLowerCase().includes(currentFilters.drive.toLowerCase()))
    }

    // Dodatni filteri
    if (currentFilters.exteriorColor) {
      filtered = filtered.filter(car => car.color?.toLowerCase().includes(currentFilters.exteriorColor.toLowerCase()))
    }
    if (currentFilters.interiorColor) {
      filtered = filtered.filter(car => car.interiorColor?.toLowerCase().includes(currentFilters.interiorColor.toLowerCase()))
    }
    if (currentFilters.doors) {
      filtered = filtered.filter(car => car.doors?.toString().includes(currentFilters.doors))
    }
    if (currentFilters.registrationType) {
      filtered = filtered.filter(car => car.registrationType?.toLowerCase().includes(currentFilters.registrationType.toLowerCase()))
    }
    if (currentFilters.ownershipTransfer) {
      filtered = filtered.filter(car => car.previousOwners?.toLowerCase().includes(currentFilters.ownershipTransfer.toLowerCase()))
    }

    // Boolean filteri
    if (currentFilters.airConditioning) {
      filtered = filtered.filter(car => car.features?.airConditioning || car.equipment?.includes('Klimaanlage'))
    }
    if (currentFilters.navigation) {
      filtered = filtered.filter(car => car.features?.navigation || car.equipment?.includes('Navigation'))
    }
    if (currentFilters.parkingSensors) {
      filtered = filtered.filter(car => car.features?.parkingSensors || car.equipment?.includes('Parksensoren'))
    }
    if (currentFilters.buyNow) {
      filtered = filtered.filter(car => car.buyNow === true)
    }

    setDisplayedCars(filtered)
  }



  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FaHome />
                  Startseite
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">Fahrzeuge</h1>
                  <p className="text-gray-300 mt-1">
                    Seite {currentPage} von {maxPages} ({displayedCars?.length || 0} von {total} Fahrzeugen angezeigt)
                  </p>
                </div>
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

      {/* FilterPanel Component */}
      <FilterPanel 
        isOpen={isFilterOpen} 
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
        allCars={allCars}
        filteredCars={displayedCars}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        filters={filters}
      />

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
            {!isLoading && displayedCars && displayedCars.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {displayedCars.map((car) => (
                    <div
                      key={car.mobileAdId || car.id}
                      onClick={() => handleCarClick(car)}
                      className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-800 hover:border-red-500 hover:scale-105"
                    >
                      {/* Car Image */}
                      <div className="relative h-48 bg-black">
                        <img
                          src={car.images?.[0]?.xxl || FALLBACK_IMG}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Year Badge */}
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                          {car.year}
                        </div>
                      </div>

                      {/* Car Info */}
                      <div className="p-5 bg-gradient-to-b from-gray-900 to-black">
                        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-2 truncate">
                          {car.make} {car.model}
                        </h3>
                        {/* Main Details */}
                        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                          <div className="flex items-center gap-1 text-gray-400">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            {formatMileage(car.mileage)}
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            {car.fuel || 'N/A'}
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            {car.gearbox || 'N/A'}
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            {car.power ? `${car.power} kW` : 'N/A'}
                          </div>
                        </div>

                        {/* Additional Details */}
                        {(car.doors || car.seats || car.driveType) && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {car.doors && (
                              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                                {car.doors} Türen
                              </span>
                            )}
                            {car.seats && (
                              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                                {car.seats} Sitze
                              </span>
                            )}
                            {car.driveType && (
                              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                                {car.driveType}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Price */}
                        <div className="border-t border-gray-800 pt-3">
                          <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">
                            {formatPrice(car.price.consumerPriceGross)}
                          </div>
                          {car.price.consumerPriceNet && (
                            <div className="text-xs text-gray-500">
                              Netto: {formatPrice(car.price.consumerPriceNet)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vorherige
                  </button>
                  <div className="flex items-center gap-1">
                    {generatePageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageClick(page)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === maxPages}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Nächste
                  </button>
                </div>
              </>
            )}

            {/* No Results */}
            {!isLoading && (!displayedCars || displayedCars.length === 0) && (
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
