import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaFilter, FaTimes, FaCarSide, FaEuroSign, FaCalendarAlt, FaGasPump, FaCog, FaRoad } from 'react-icons/fa';
import { useCars } from '../../context/CarsContext';

const FilterPanel = ({ isOpen, onToggle }) => {
  const { allCars, applyFilters, resetFilters, filters: contextFilters, filteredCars } = useCars();
  
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    priceFrom: '',
    priceTo: '',
    yearFrom: '',
    yearTo: '',
    fuel: '',
    transmission: '',
    mileageFrom: '',
    mileageTo: ''
  });

  // Generiraj filter opcije iz postojećih automobila
  const filterOptions = useMemo(() => {
    if (!allCars || allCars.length === 0) return {};

    const makes = [...new Set(allCars.map(car => car.make).filter(Boolean))].sort();
    const models = [...new Set(allCars.map(car => car.model).filter(Boolean))].sort();
    const fuelTypes = [...new Set(allCars.map(car => car.fuel).filter(Boolean))].sort();
    const transmissions = [...new Set(allCars.map(car => car.gearbox || car.transmission).filter(Boolean))].sort();
    
    const prices = allCars.map(car => car.price?.consumerPriceGross || car.price?.value).filter(Boolean);
    const years = allCars.map(car => car.year).filter(Boolean);
    const mileages = allCars.map(car => car.mileage).filter(Boolean);

    return {
      makes,
      models,
      fuelTypes,
      transmissions,
      priceRange: prices.length > 0 ? { min: Math.min(...prices), max: Math.max(...prices) } : null,
      yearRange: years.length > 0 ? { min: Math.min(...years), max: Math.max(...years) } : null,
      mileageRange: mileages.length > 0 ? { min: Math.min(...mileages), max: Math.max(...mileages) } : null
    };
  }, [allCars]);

  // Ažuriraj lokalne filtere kada se promijeni kontekst
  useEffect(() => {
    setFilters(prev => ({ ...prev, ...contextFilters }));
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
      make: '',
      model: '',
      priceFrom: '',
      priceTo: '',
      yearFrom: '',
      yearTo: '',
      fuel: '',
      transmission: '',
      mileageFrom: '',
      mileageTo: ''
    };
    setFilters(emptyFilters);
    resetFilters();
  };

  // Provjeri da li su filtri aktivni
  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } w-80 overflow-y-auto`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFilter className="text-lg" />
            <h2 className="text-xl font-bold">Filtri</h2>
          </div>
          <button 
            onClick={onToggle}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Rezultati counter */}
        <div className="mt-2 text-blue-100">
          <span className="text-sm">
            Pronađeno: <span className="font-bold text-white">{filteredCars?.length || 0}</span> automobila
          </span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Reset button */}
        {hasActiveFilters && (
          <button 
            onClick={handleResetFilters}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaTimes />
            Resetiraj filtere
          </button>
        )}

        {/* Marka */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <FaCarSide className="text-blue-500" />
            Marka
          </label>
          <select 
            value={filters.make} 
            onChange={(e) => handleFilterChange('make', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sve marke</option>
            {filterOptions.makes?.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <FaCarSide className="text-blue-500" />
            Model
          </label>
          <select 
            value={filters.model} 
            onChange={(e) => handleFilterChange('model', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Svi modeli</option>
            {filterOptions.models?.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* Cijena */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <FaEuroSign className="text-green-500" />
            Cijena (€)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="number" 
              placeholder="Od"
              value={filters.priceFrom}
              onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
              type="number" 
              placeholder="Do"
              value={filters.priceTo}
              onChange={(e) => handleFilterChange('priceTo', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {filterOptions.priceRange && (
            <div className="text-sm text-gray-500">
              Raspon: {filterOptions.priceRange.min?.toLocaleString()} - {filterOptions.priceRange.max?.toLocaleString()} €
            </div>
          )}
        </div>

        {/* Godina */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <FaCalendarAlt className="text-purple-500" />
            Godina proizvodnje
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="number" 
              placeholder="Od"
              value={filters.yearFrom}
              onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
              type="number" 
              placeholder="Do"
              value={filters.yearTo}
              onChange={(e) => handleFilterChange('yearTo', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {filterOptions.yearRange && (
            <div className="text-sm text-gray-500">
              Raspon: {filterOptions.yearRange.min} - {filterOptions.yearRange.max}
            </div>
          )}
        </div>

        {/* Gorivo */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <FaGasPump className="text-orange-500" />
            Vrsta goriva
          </label>
          <select 
            value={filters.fuel} 
            onChange={(e) => handleFilterChange('fuel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sve vrste</option>
            {filterOptions.fuelTypes?.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>

        {/* Mjenjač */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <FaCog className="text-gray-500" />
            Mjenjač
          </label>
          <select 
            value={filters.transmission} 
            onChange={(e) => handleFilterChange('transmission', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Svi mjenjači</option>
            {filterOptions.transmissions?.map(transmission => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </div>

        {/* Kilometraža */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <FaRoad className="text-indigo-500" />
            Kilometraža (km)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="number" 
              placeholder="Od"
              value={filters.mileageFrom}
              onChange={(e) => handleFilterChange('mileageFrom', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
              type="number" 
              placeholder="Do"
              value={filters.mileageTo}
              onChange={(e) => handleFilterChange('mileageTo', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {filterOptions.mileageRange && (
            <div className="text-sm text-gray-500">
              Raspon: {filterOptions.mileageRange.min?.toLocaleString()} - {filterOptions.mileageRange.max?.toLocaleString()} km
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FilterPanel;
