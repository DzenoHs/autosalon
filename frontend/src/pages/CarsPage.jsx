import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaFilter, FaSearch, FaHome, FaTimes, FaTachometerAlt, FaGasPump, FaCogs, FaClipboardCheck} from 'react-icons/fa'
import {Calendar, ClipboardCheck, Zap} from 'lucide-react'
import mobileApiService from '../services/mobileApiService'
import {mapFuel, mapGearbox} from '../services/mapper'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&crop=center'
const PAGE_SIZE = 16

export default function CarsPage() {
  const navigate = useNavigate()

  // State for cars and pagination
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  // const [pageSize, setPageSize] = useState(16) // Default page size
  const [total, setTotal] = useState(0)
  const [maxPages, setMaxPages] = useState(1)

  // UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [yearFromInput, setYearFromInput] = useState('')
  const [yearToInput, setYearToInput] = useState('')

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
  // const [allCars, setAllCars] = useState([])
  const [displayedCars, setDisplayedCars] = useState([])

  // State for unique car makes
  const [uniqueMakes, setUniqueMakes] = useState([])

  // Add state for car models
  const [carModels, setCarModels] = useState([])

  const [gearboxes, setGearboxes] = useState([])

  const [fuels, setFuels] = useState([])

  // Fetch unique car makes from API
  useEffect(() => {
    const fetchUniqueMakes = async () => {
      try {
        const makes = await mobileApiService.fetchUniqueCarMakes() // Use the new method
        setUniqueMakes(makes)
      } catch (err) {
        console.error('❌ Error fetching car makes:', err)
        setError('Failed to load car makes. Please try again later.')
      }
    }
    const fetchGearbox = async () => {
      try {
        const gearboxes = await mobileApiService.fetchCarGearbox() // Use the new method
        setGearboxes(gearboxes)
      } catch (err) {
        console.error('❌ Error fetching car makes:', err)
        setError('Failed to load car makes. Please try again later.')
      }
    }
    const fetchFuels = async () => {
      try {
        const fuels = await mobileApiService.fetchCarFuel() // Use the new method
        setFuels(fuels)
      } catch (err) {
        console.error('❌ Error fetching car fuels:', err)
        setError('Failed to load car makes. Please try again later.')
      }
    }
    fetchFuels()

    fetchGearbox()

    fetchUniqueMakes()
  }, [])

  // Fetch car models when the make filter changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!filters.make) {
        setCarModels([]) // Reset models if no make is selected
        return
      }

      try {
        console.log(`🔄 Fetching car models for make: ${filters.make}`)
        const models = await mobileApiService.fetchCarModels(filters.make)
        setCarModels(models)
        console.log(`✅ Fetched ${models.length} models for make: ${filters.make}`)
      } catch (error) {
        console.error('❌ Error fetching car models:', error)
        setCarModels([]) // Reset models on error
      }
    }

    fetchModels()
  }, [filters.make])

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
    setYearFromInput('')
    setYearToInput('')
    setDisplayedCars(cars)
    setCurrentPage(1)
  }

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true)
        setError(null)

        console.log('🔄 Fetching cars from API...')
        const result = await mobileApiService.fetchCarsFromMobileApi(
          currentPage,
          PAGE_SIZE,
          filters.make,
          filters.model,
          filters.transmission,
          filters.fuel,
          filters.priceFrom,
          filters.priceTo,
          filters.yearFrom,
          filters.yearTo
        )

        console.log('✅ Cars fetched successfully:', result)
        setCars(result.ads)
        setTotal(result.total)
        setMaxPages(result.maxPages)
        // Čuvaj sve automobile za filtriranje (samo na prvoj stranici)
        // if (currentPage === 1) {
        //   setAllCars(result.ads)
        // } else {
        //   setAllCars((prev) => [...prev, ...result.ads])
        // }

        setDisplayedCars(result.ads)
      } catch (err) {
        console.error('❌ Error fetching cars:', err)
        setError('Failed to load cars. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [
    currentPage,
    filters.make,
    filters.model,
    filters.transmission,
    filters.fuel,
    filters.priceFrom,
    filters.priceTo,
    filters.yearFrom,
    filters.yearTo
  ]) // Refetch cars when currentPage or pageSize changes

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

  // Format power (kW to PS conversion)
  const formatPower = (powerKw) => {
    if (!powerKw) return 'N/A'
    const ps = Math.round(powerKw * 1.35962)
    return `${powerKw} kW(${ps} PS)`
  }

  // Format HU (Hauptuntersuchung) date
  const formatHU = (huDate) => {
    if (!huDate) return 'N/A'
    // Format: "202608" -> "08/2026"
    if (huDate.length === 6) {
      const year = huDate.substring(0, 4)
      const month = huDate.substring(4, 6)
      return `${month}/${year}`
    }
    return huDate
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
    let newFilters = {
      ...filters,
      [field]: value
    }
    if (field === 'make') {
      newFilters = {
        ...newFilters,
        model: '' // Reset the model filter
      }
    }

    setFilters(newFilters)
    setCurrentPage(1)
    applyFilters(newFilters)
  }

  // Apply filters - expanded for FilterPanel compatibility
  const applyFilters = (currentFilters) => {
    if (!cars || cars.length === 0) {
      setDisplayedCars([])
      return
    }
    let filtered = cars

    // if (currentFilters.make) {
    //   filtered = filtered.filter((car) => car.make?.toLowerCase().includes(currentFilters.make.toLowerCase()))
    // }
    // if (currentFilters.model) {
    //   filtered = filtered.filter((car) => car.model?.toLowerCase().includes(currentFilters.model.toLowerCase()))
    // }
    // if (currentFilters.yearFrom) {
    //   filtered = filtered.filter((car) => car.year >= parseInt(currentFilters.yearFrom))
    // }
    // if (currentFilters.yearTo) {
    //   filtered = filtered.filter((car) => car.year <= parseInt(currentFilters.yearTo))
    // }
    // if (currentFilters.priceFrom) {
    //   filtered = filtered.filter((car) => {
    //     const price = car.price?.consumerPriceGross || car.price?.consumerPriceNet || car.price?.value
    //     return price >= parseInt(currentFilters.priceFrom)
    //   })
    // }
    // if (currentFilters.priceTo) {
    //   filtered = filtered.filter((car) => {
    //     const price = car.price?.consumerPriceGross || car.price?.consumerPriceNet || car.price?.value
    //     return price <= parseInt(currentFilters.priceTo)
    //   })
    // }
    if (currentFilters.mileageMax) {
      filtered = filtered.filter((car) => car.mileage <= parseInt(currentFilters.mileageMax))
    }
    if (currentFilters.condition) {
      filtered = filtered.filter((car) => car.condition?.toLowerCase().includes(currentFilters.condition.toLowerCase()))
    }
    if (currentFilters.location) {
      filtered = filtered.filter((car) => car.location?.toLowerCase().includes(currentFilters.location.toLowerCase()))
    }
    if (currentFilters.seats) {
      filtered = filtered.filter((car) => car.seats?.toString() === currentFilters.seats)
    }

    // Tehnički filteri
    // if (currentFilters.fuel) {
    //   filtered = filtered.filter((car) => car.fuel?.toLowerCase().includes(currentFilters.fuel.toLowerCase()))
    // }
    if (currentFilters.powerMin) {
      filtered = filtered.filter((car) => car.power >= parseInt(currentFilters.powerMin))
    }
    if (currentFilters.powerMax) {
      filtered = filtered.filter((car) => car.power <= parseInt(currentFilters.powerMax))
    }
    if (currentFilters.co2Max) {
      filtered = filtered.filter((car) => car.co2 <= parseFloat(currentFilters.co2Max))
    }
    if (currentFilters.emissionStandard) {
      filtered = filtered.filter((car) =>
        car.emissionStandard?.toLowerCase().includes(currentFilters.emissionStandard.toLowerCase())
      )
    }
    if (currentFilters.consumptionMax) {
      filtered = filtered.filter((car) => car.consumption <= parseFloat(currentFilters.consumptionMax))
    }
    if (currentFilters.transmission) {
      filtered = filtered.filter((car) =>
        car.gearbox?.toLowerCase().includes(currentFilters.transmission.toLowerCase())
      )
    }
    if (currentFilters.drive) {
      filtered = filtered.filter((car) => car.drive?.toLowerCase().includes(currentFilters.drive.toLowerCase()))
    }

    // Dodatni filteri
    if (currentFilters.exteriorColor) {
      filtered = filtered.filter((car) => car.color?.toLowerCase().includes(currentFilters.exteriorColor.toLowerCase()))
    }
    if (currentFilters.interiorColor) {
      filtered = filtered.filter((car) =>
        car.interiorColor?.toLowerCase().includes(currentFilters.interiorColor.toLowerCase())
      )
    }
    if (currentFilters.doors) {
      filtered = filtered.filter((car) => car.doors?.toString().includes(currentFilters.doors))
    }
    if (currentFilters.registrationType) {
      filtered = filtered.filter((car) =>
        car.registrationType?.toLowerCase().includes(currentFilters.registrationType.toLowerCase())
      )
    }
    if (currentFilters.ownershipTransfer) {
      filtered = filtered.filter((car) =>
        car.previousOwners?.toLowerCase().includes(currentFilters.ownershipTransfer.toLowerCase())
      )
    }

    // Boolean filteri
    if (currentFilters.airConditioning) {
      filtered = filtered.filter((car) => car.features?.airConditioning || car.equipment?.includes('Klimaanlage'))
    }
    if (currentFilters.navigation) {
      filtered = filtered.filter((car) => car.features?.navigation || car.equipment?.includes('Navigation'))
    }
    if (currentFilters.parkingSensors) {
      filtered = filtered.filter((car) => car.features?.parkingSensors || car.equipment?.includes('Parksensoren'))
    }
    if (currentFilters.buyNow) {
      filtered = filtered.filter((car) => car.buyNow === true)
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
                {/* TO DO: FIX SEARCH TO WORK WITH API */}
                {/* Search */}
                {/* <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Fahrzeuge suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-white placeholder-gray-400"
                  />
                </div> */}

                {/* Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    isFilterOpen
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30'
                      : 'bg-black text-red-300 border-red-600 hover:bg-red-900/20 hover:text-white'
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

      {/* Filter Panel */}
      <div
        className={`fixed left-0 top-0 h-full bg-black border-r-2 border-red-600 shadow-2xl transform transition-transform duration-300 z-50 ${
          isFilterOpen ? 'translate-x-0' : '-translate-x-full'
        } w-80 overflow-y-auto`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-red-900 text-white p-4 sticky top-0 z-10 border-b border-red-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFilter className="text-lg text-red-400" />
              <h2 className="text-xl font-bold">Filter</h2>
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 hover:bg-red-800 rounded-lg transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Results counter */}
          <div className="mt-2 text-red-300">
            <span className="text-sm">
              {displayedCars.length} von {cars.length} Fahrzeugen
            </span>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6 bg-gradient-to-b from-gray-900 to-black">
          {/* Make Filter */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Marke</label>
            <select
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className="w-full p-3 bg-black border-2 border-red-600 rounded-lg text-white focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
            >
              <option value="">Alle Marken</option>
              {uniqueMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Model Filter */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Modell</label>
            <select
              disabled={filters.make === ''}
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              className="w-full p-3 bg-black border-2 border-red-600 rounded-lg text-white focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
            >
              <option value="">Alle Modelle</option>
              {carModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Preis (€)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Von"
                value={filters.priceFrom}
                onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                className="p-3 bg-black border-2 border-red-600 rounded-lg text-white placeholder-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
              />
              <input
                type="number"
                placeholder="Bis"
                value={filters.priceTo}
                onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                className="p-3 bg-black border-2 border-red-600 rounded-lg text-white placeholder-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
              />
            </div>
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Erstzulassung</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="Von"
                value={yearFromInput}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                  setYearFromInput(v)
                  if (v.length === 4 || v === '') {
                    handleFilterChange('yearFrom', v)
                  }
                }}
                className="p-3 bg-black border-2 border-red-600 rounded-lg text-white placeholder-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="Bis"
                value={yearToInput}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                  setYearToInput(v)
                  if (v.length === 4 || v === '') {
                    handleFilterChange('yearTo', v)
                  }
                }}
                className="p-3 bg-black border-2 border-red-600 rounded-lg text-white placeholder-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
              />
            </div>
          </div>

          {/* Fuel Filter */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Kraftstoff</label>
            <select
              value={filters.fuel}
              onChange={(e) => handleFilterChange('fuel', e.target.value)}
              className="w-full p-3 bg-black border-2 border-red-600 rounded-lg text-white focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
            >
              <option value="">Alle Kraftstoffe</option>
              {fuels.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {mapFuel(fuel)}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission Filter */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">Getriebe</label>
            <select
              value={filters.transmission}
              onChange={(e) => handleFilterChange('transmission', e.target.value)}
              className="w-full p-3 bg-black border-2 border-red-600 rounded-lg text-white focus:border-red-400 focus:ring-2 focus:ring-red-600/30 transition-all"
            >
              <option value="">Alle Getriebe</option>
              {gearboxes.map((transmission) => (
                <option key={transmission} value={transmission}>
                  {mapGearbox(transmission)}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg shadow-red-600/30 font-medium"
          >
            Filter zurücksetzen
          </button>
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
            {!isLoading && displayedCars && displayedCars.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {displayedCars.map((car) => (
                    <div
                      key={car.mobileAdId || car.id}
                      onClick={() => handleCarClick(car)}
                      className="h-full flex flex-col bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-800 hover:border-red-500 hover:scale-105"
                    >
                      {/* Car Image */}
                      <div className="relative  h-48 bg-black">
                        <img
                          src={car.images?.[0]?.xxl || FALLBACK_IMG}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Car Info */}
                      <div className="p-5 bg-gradient-to-b from-gray-900 to-black flex-1">
                        <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors mb-2 line-clamp-2">
                          {car.make} {car.modelDescription.replace(/&amp;/g, '&')}
                        </h3>
                        {/* Main Details */}
                        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                          <div className="flex items-center gap-2 text-gray-400">
                            <FaTachometerAlt className="text-red-500 text-sm" />
                            {formatMileage(car.mileage)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <FaGasPump className="text-red-500 text-sm" />
                            {car.fuel || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <FaCogs className="text-red-500 text-sm" />
                            {car.gearbox || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <ClipboardCheck className="w-4 h-4 text-red-500" />
                            HU {formatHU(car.generalInspection)}
                          </div>
                        </div>

                        {/* Year and Power Info */}
                        <div className="grid grid-cols-2 gap-1 mb-2">
                          <div className="text-center bg-red-900/20 px-1 py-1 rounded border border-red-500/20">
                            <div className="text-xs text-red-400 font-medium">Erstzulassung</div>
                            <div className="text-xs text-red-300 font-bold">
                              {car.year || (car.firstRegistration ? car.firstRegistration.substring(0, 4) : 'N/A')}
                            </div>
                          </div>
                          <div className="text-center bg-red-900/20 px-1 py-1 rounded border border-red-500/20">
                            <div className="text-xs text-red-400 font-medium">Leistung</div>
                            <div className="text-xs text-red-300 font-bold">
                              {formatPower(car.power)}
                            </div>
                          </div>
                        </div>

                        {/* Additional Details */}
                        {(car.doors || car.seats || car.driveType) && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {car.doors && (
                              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">{car.doors}</span>
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
