import React, { createContext, useContext, useState, useCallback } from 'react';

const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [totalCars, setTotalCars] = useState(0);

  // Filtriraj automobile kada se promijene filtri
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    
    let filtered = allCars;
    
    // Primijeni sve aktivne filtere
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "" && value !== "all") {
        filtered = filtered.filter(car => {
          let carValue = car[key];
          
          // Posebno rukovanje za cijenu
          if (key === 'priceFrom' && car.price?.consumerPriceGross) {
            return car.price.consumerPriceGross >= parseInt(value);
          }
          if (key === 'priceTo' && car.price?.consumerPriceGross) {
            return car.price.consumerPriceGross <= parseInt(value);
          }
          
          // Posebno rukovanje za godinu
          if (key === 'yearFrom' && car.year) {
            return car.year >= parseInt(value);
          }
          if (key === 'yearTo' && car.year) {
            return car.year <= parseInt(value);
          }
          
          // Posebno rukovanje za kilometražu
          if (key === 'mileageFrom' && car.mileage) {
            return car.mileage >= parseInt(value);
          }
          if (key === 'mileageTo' && car.mileage) {
            return car.mileage <= parseInt(value);
          }
          
          // Standardno filtriranje po tekstu
          if (carValue) {
            return carValue.toString().toLowerCase().includes(value.toLowerCase());
          }
          
          return false;
        });
      }
    });
    
    setFilteredCars(filtered);
    console.log(`🔍 Filtrirano: ${filtered.length} od ${allCars.length} automobila`);
  }, [allCars]);

  // Resetiraj filtere
  const resetFilters = useCallback(() => {
    setFilters({});
    setFilteredCars(allCars);
  }, [allCars]);

  return (
    <CarsContext.Provider value={{
      allCars,
      setAllCars,
      filteredCars,
      setFilteredCars,
      isLoading,
      setIsLoading,
      error,
      setError,
      filters,
      setFilters,
      totalCars,
      setTotalCars,
      applyFilters,
      resetFilters
    }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};
