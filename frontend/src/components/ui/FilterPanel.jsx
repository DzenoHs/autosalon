import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaFilter, FaTimes, FaCarSide, FaEuroSign, FaCalendarAlt, FaGasPump, FaCog, FaRoad, FaPalette, FaUsers, FaMapMarkerAlt, FaDoorOpen, FaFileAlt, FaShoppingCart, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterPanel = ({ isOpen, onToggle, allCars, filteredCars, applyFilters, resetFilters, filters: contextFilters }) => {
  
  const [filters, setFilters] = useState({
    // Osnovni filteri
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
    // Tehnički filteri
    fuel: '',
    powerMin: '',
    powerMax: '',
    co2Max: '',
    emissionStandard: '',
    consumptionMax: '',
    transmission: '',
    drive: '',
    // Dodatni filteri
    exteriorColor: '',
    interiorColor: '',
    airConditioning: false,
    navigation: false,
    parkingSensors: false,
    registrationType: '',
    doors: '',
    ownershipTransfer: '',
    buyNow: false
  });

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    technical: false,
    additional: false
  });

  // Generiraj filter opcije iz postojećih automobila i preddefinirane opcije
  const filterOptions = useMemo(() => {
    if (!allCars || allCars.length === 0) return {};

    const makes = [...new Set(allCars.map(car => car.make).filter(Boolean))].sort();
    const models = [...new Set(allCars.map(car => car.model).filter(Boolean))].sort();
    const fuelTypes = [...new Set(allCars.map(car => car.fuel).filter(Boolean))].sort();
    const transmissions = [...new Set(allCars.map(car => car.gearbox || car.transmission).filter(Boolean))].sort();
    const colors = [...new Set(allCars.map(car => car.color).filter(Boolean))].sort();
    
    const prices = allCars.map(car => car.price?.consumerPriceGross || car.price?.value).filter(Boolean);
    const years = allCars.map(car => car.year).filter(Boolean);
    const mileages = allCars.map(car => car.mileage).filter(Boolean);
    const powers = allCars.map(car => car.power).filter(Boolean);

    return {
      makes,
      models,
      fuelTypes,
      transmissions,
      colors,
      vehicleTypes: ['Limousine', 'Kombi', 'SUV', 'Coupé', 'Cabrio', 'Kleinwagen', 'Sportwagen', 'Van', 'Pickup'],
      conditions: ['Neu', 'Gebraucht', 'Vorführwagen', 'Jahreswagen', 'Unfallwagen'],
      locations: ['Deutschland', 'Österreich', 'Schweiz', 'Niederlande', 'Belgien', 'Frankreich'],
      seatsOptions: ['2', '4', '5', '7', '8', '9+'],
      emissionStandards: ['Euro 6', 'Euro 5', 'Euro 4', 'Euro 3'],
      driveTypes: ['Vorderradantrieb', 'Hinterradantrieb', 'Allradantrieb'],
      registrationTypes: ['Privat', 'Gewerblich', 'Export'],
      doorOptions: ['2/3', '4/5'],
      ownershipOptions: ['1 Vorbesitzer', '2 Vorbesitzer', '3+ Vorbesitzer', 'Erstbesitzer'],
      priceRange: prices.length > 0 ? { min: Math.min(...prices), max: Math.max(...prices) } : null,
      yearRange: years.length > 0 ? { min: Math.min(...years), max: Math.max(...years) } : null,
      mileageRange: mileages.length > 0 ? { min: Math.min(...mileages), max: Math.max(...mileages) } : null,
      powerRange: powers.length > 0 ? { min: Math.min(...powers), max: Math.max(...powers) } : null
    };
  }, [allCars]);

  // Ažuriraj lokalne filtere kada se promijeni kontekst
  useEffect(() => {
    if (contextFilters) {
      setFilters(prev => ({ ...prev, ...contextFilters }));
    }
  }, [contextFilters]);

  // Handle filter change
  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Reset svih filtera
  const handleResetFilters = () => {
    const emptyFilters = {
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
    };
    setFilters(emptyFilters);
    resetFilters();
  };

  // Toggle section visibility
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Provjeri da li su filtri aktivni
  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  return (
    <div className={`fixed left-0 top-0 h-full bg-black shadow-2xl transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } w-80 overflow-y-auto border-r-2 border-red-600`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-red-900 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFilter className="text-lg" />
            <h2 className="text-xl font-bold">Filter</h2>
          </div>
          <button 
            onClick={onToggle}
            className="p-2 hover:bg-red-700 rounded-lg transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Rezultati counter */}
        <div className="mt-2 text-gray-300">
          <span className="text-sm">
            Gefunden: <span className="font-bold text-white">{filteredCars?.length || 0}</span> Fahrzeuge
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Reset button */}
        {hasActiveFilters && (
          <button 
            onClick={handleResetFilters}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-red-500"
          >
            <FaTimes />
            Alle Filter zurücksetzen
          </button>
        )}

        {/* GRUNDFILTER */}
        <div className="border border-red-600 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('basic')}
            className="w-full bg-red-900 hover:bg-red-800 text-white p-4 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold">Grundfilter</span>
            {expandedSections.basic ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {expandedSections.basic && (
            <div className="p-4 space-y-4 bg-black/80">
              
              {/* Fahrzeugtyp */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-red-300 font-medium">
                  <FaCarSide className="text-red-400" />
                  Fahrzeugtyp
                </label>
                <select 
                  value={filters.vehicleType} 
                  onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
                  className="w-full p-3 bg-gray-900 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Alle Fahrzeugtypen</option>
                  {filterOptions.vehicleTypes?.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Marke und Modell */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-red-300 font-medium text-sm">Marke</label>
                  <select 
                    value={filters.make} 
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  >
                    <option value="">Alle Marken</option>
                    {filterOptions.makes?.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-red-300 font-medium text-sm">Modell</label>
                  <select 
                    value={filters.model} 
                    onChange={(e) => handleFilterChange('model', e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  >
                    <option value="">Alle Modelle</option>
                    {filterOptions.models?.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Baujahr */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-300 font-medium">
                  <FaCalendarAlt className="text-purple-400" />
                  Baujahr
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number" 
                    placeholder="Von"
                    value={filters.yearFrom}
                    onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                    className="p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                  />
                  <input 
                    type="number" 
                    placeholder="Bis"
                    value={filters.yearTo}
                    onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                    className="p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Preis */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-300 font-medium">
                  <FaEuroSign className="text-green-400" />
                  Preis (€)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number" 
                    placeholder="Von"
                    value={filters.priceFrom}
                    onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                    className="p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                  />
                  <input 
                    type="number" 
                    placeholder="Bis"
                    value={filters.priceTo}
                    onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                    className="p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Kilometerstand */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-300 font-medium">
                  <FaRoad className="text-indigo-400" />
                  Max. Kilometerstand
                </label>
                <input 
                  type="number" 
                  placeholder="Max. km"
                  value={filters.mileageMax}
                  onChange={(e) => handleFilterChange('mileageMax', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Zustand */}
              <div className="space-y-2">
                <label className="text-gray-300 font-medium">Zustand</label>
                <select 
                  value={filters.condition} 
                  onChange={(e) => handleFilterChange('condition', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Alle Zustände</option>
                  {filterOptions.conditions?.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              {/* Standort und Sitze */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                    <FaMapMarkerAlt className="text-red-400" />
                    Standort
                  </label>
                  <select 
                    value={filters.location} 
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle Länder</option>
                    {filterOptions.locations?.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                    <FaUsers className="text-yellow-400" />
                    Sitze
                  </label>
                  <select 
                    value={filters.seats} 
                    onChange={(e) => handleFilterChange('seats', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle</option>
                    {filterOptions.seatsOptions?.map(seats => (
                      <option key={seats} value={seats}>{seats}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TECHNISCHE FILTER */}
        <div className="border border-red-600 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('technical')}
            className="w-full bg-red-900 hover:bg-red-800 text-white p-4 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold">Technische Filter</span>
            {expandedSections.technical ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {expandedSections.technical && (
            <div className="p-4 space-y-4 bg-black/80">
              
              {/* Kraftstoff */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-300 font-medium">
                  <FaGasPump className="text-orange-400" />
                  Kraftstoff
                </label>
                <select 
                  value={filters.fuel} 
                  onChange={(e) => handleFilterChange('fuel', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Alle Kraftstoffe</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elektro">Elektro</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Plug-in-Hybrid">Plug-in-Hybrid</option>
                  <option value="Autogas (LPG)">Autogas (LPG)</option>
                  <option value="Erdgas (CNG)">Erdgas (CNG)</option>
                </select>
              </div>

              {/* Motorleistung */}
              <div className="space-y-2">
                <label className="text-gray-300 font-medium">Motorleistung (PS)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number" 
                    placeholder="Min. PS"
                    value={filters.powerMin}
                    onChange={(e) => handleFilterChange('powerMin', e.target.value)}
                    className="p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                  />
                  <input 
                    type="number" 
                    placeholder="Max. PS"
                    value={filters.powerMax}
                    onChange={(e) => handleFilterChange('powerMax', e.target.value)}
                    className="p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              {/* CO2 und Emissionsklasse */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium text-sm">Max. CO2 (g/km)</label>
                  <input 
                    type="number" 
                    placeholder="Max. CO2"
                    value={filters.co2Max}
                    onChange={(e) => handleFilterChange('co2Max', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium text-sm">Emissionsklasse</label>
                  <select 
                    value={filters.emissionStandard} 
                    onChange={(e) => handleFilterChange('emissionStandard', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle</option>
                    {filterOptions.emissionStandards?.map(standard => (
                      <option key={standard} value={standard}>{standard}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Verbrauch */}
              <div className="space-y-2">
                <label className="text-gray-300 font-medium">Max. Verbrauch (l/100km)</label>
                <input 
                  type="number" 
                  step="0.1"
                  placeholder="Max. Verbrauch"
                  value={filters.consumptionMax}
                  onChange={(e) => handleFilterChange('consumptionMax', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Getriebe und Antrieb */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                    <FaCog className="text-gray-400" />
                    Getriebe
                  </label>
                  <select 
                    value={filters.transmission} 
                    onChange={(e) => handleFilterChange('transmission', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle</option>
                    <option value="Automatik">Automatik</option>
                    <option value="Manuell">Manuell</option>
                    <option value="Halbautomatik">Halbautomatik</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium text-sm">Antrieb</label>
                  <select 
                    value={filters.drive} 
                    onChange={(e) => handleFilterChange('drive', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle</option>
                    {filterOptions.driveTypes?.map(drive => (
                      <option key={drive} value={drive}>{drive}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ZUSÄTZLICHE FILTER */}
        <div className="border border-red-600 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('additional')}
            className="w-full bg-red-900 hover:bg-red-800 text-white p-4 flex items-center justify-between transition-colors"
          >
            <span className="font-semibold">Zusätzliche Filter</span>
            {expandedSections.additional ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {expandedSections.additional && (
            <div className="p-4 space-y-4 bg-black/80">
              
              {/* Farben */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                    <FaPalette className="text-pink-400" />
                    Außenfarbe
                  </label>
                  <select 
                    value={filters.exteriorColor} 
                    onChange={(e) => handleFilterChange('exteriorColor', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle Farben</option>
                    {filterOptions.colors?.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 font-medium text-sm">Innenfarbe</label>
                  <select 
                    value={filters.interiorColor} 
                    onChange={(e) => handleFilterChange('interiorColor', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle Farben</option>
                    {filterOptions.colors?.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ausstattung */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium">Ausstattung</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-red-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.airConditioning}
                      onChange={(e) => handleFilterChange('airConditioning', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-900 border-red-600 rounded focus:ring-red-500"
                    />
                    Klimaanlage
                  </label>
                  <label className="flex items-center gap-3 text-red-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.navigation}
                      onChange={(e) => handleFilterChange('navigation', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-900 border-red-600 rounded focus:ring-red-500"
                    />
                    Navigation
                  </label>
                  <label className="flex items-center gap-3 text-red-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.parkingSensors}
                      onChange={(e) => handleFilterChange('parkingSensors', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-900 border-red-600 rounded focus:ring-red-500"
                    />
                    Parksensoren
                  </label>
                </div>
              </div>

              {/* Weitere Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                    <FaFileAlt className="text-red-400" />
                    Zulassungsart
                  </label>
                  <select 
                    value={filters.registrationType} 
                    onChange={(e) => handleFilterChange('registrationType', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="">Alle</option>
                    {filterOptions.registrationTypes?.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                      <FaDoorOpen className="text-brown-400" />
                      Türen
                    </label>
                    <select 
                      value={filters.doors} 
                      onChange={(e) => handleFilterChange('doors', e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    >
                      <option value="">Alle</option>
                      {filterOptions.doorOptions?.map(doors => (
                        <option key={doors} value={doors}>{doors}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-300 font-medium text-sm">Vorbesitzer</label>
                    <select 
                      value={filters.ownershipTransfer} 
                      onChange={(e) => handleFilterChange('ownershipTransfer', e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-red-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    >
                      <option value="">Alle</option>
                      {filterOptions.ownershipOptions?.map(ownership => (
                        <option key={ownership} value={ownership}>{ownership}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-red-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.buyNow}
                      onChange={(e) => handleFilterChange('buyNow', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-900 border-red-600 rounded focus:ring-red-500"
                    />
                    <FaShoppingCart className="text-red-400" />
                    Sofort kaufbar
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FilterPanel;
