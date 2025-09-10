import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, Gauge, Fuel, Settings, Eye } from "lucide-react";

const Cars = () => {
  const navigate = useNavigate();
  const [hoveredCar, setHoveredCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:5002/api/cars?pageNumber=1&pageSize=6');
        const data = await response.json();
        
        if (data.success && data.ads) {
          // Map API data to component format
          const mappedCars = data.ads.slice(0, 6).map((car, index) => ({
            id: car.mobileAdId || `car-${index}`,
            name: `${car.make} ${car.model}`,
            year: car.firstRegistration ? new Date(car.firstRegistration).getFullYear() : car.year,
            km: car.mileage || 0,
            priceNet: car.price?.value || 0,
            priceGross: car.price?.value ? Math.round(car.price.value * 1.19) : 0,
            fuel: car.fuel || 'Nepoznato',
            gearbox: car.gearbox || car.transmission || 'Nepoznato',
            engine: car.modelDescription || car.engine || `${car.power || 0} kW`,
            img: car.images && car.images[0] ? car.images[0].url : car.mainImage || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
            condition: car.condition || 'USED'
          }));
          
          setCars(mappedCars);
        } else {
          throw new Error('Neuspjeh u dohvaćanju automobila');
        }
      } catch (err) {
        console.error('Greška u dohvaćanju automobila:', err);
        setError(err.message);
        // Fallback na jedan primjer automobila ako API ne radi
        setCars([{
          id: 1,
          name: "BMW X5 M50d",
          year: 2023,
          km: 15000,
          priceNet: 75000,
          priceGross: 89250,
          fuel: "Diesel",
          gearbox: "Automatik",
          engine: "3.0L TwinTurbo",
          img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
          condition: "USED"
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleViewAll = () => {
    navigate('/cars');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price);
  };

  if (isLoading) {
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
    );
  }

  return (
    <section
      id="cars"
      className="relative py-32 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden"
      style={{ overflowX: "hidden" }}
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
            <span className="text-red-500 font-medium tracking-wider uppercase text-sm">
              Premium Auswahl
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Unsere
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Fahrzeuge
            </span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie unsere exklusive Auswahl an Premium-Fahrzeugen. 
            Jedes Auto wird sorgfältig geprüft und wartet darauf, Ihr neuer Begleiter zu werden.
          </p>
          
          {error && (
            <div className="mt-4 text-yellow-500 text-sm">
              ⚠️ {error} - Prikazuju se rezervni podaci
            </div>
          )}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cars.map((car) => (
            <div
              key={car.id}
              className="group relative bg-gradient-to-br from-neutral-900 to-black rounded-2xl overflow-hidden 
                         transform hover:scale-105 transition-all duration-700 cursor-pointer
                         border border-neutral-800 hover:border-red-500/30"
              onMouseEnter={() => setHoveredCar(car.id)}
              onMouseLeave={() => setHoveredCar(null)}
              onClick={() => handleCarClick(car.id)}
            >
              {/* Car Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Button */}
                <div className={`absolute top-4 right-4 transform transition-all duration-500 ${
                  hoveredCar === car.id ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}>
                  <div className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {car.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Gauge className="w-4 h-4 text-red-500" />
                    <span>{formatPrice(car.km)} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Fuel className="w-4 h-4 text-red-500" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Settings className="w-4 h-4 text-red-500" />
                    <span>{car.gearbox}</span>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="text-xs text-neutral-500">Netto</div>
                  <div className="text-2xl font-bold text-green-400">
                    €{formatPrice(car.priceNet)}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Brutto: €{formatPrice(car.priceGross)}
                  </div>
                </div>

                <div className="text-xs text-neutral-500 mb-3">
                  {car.engine}
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">
                    {car.condition}
                  </span>
                  <ChevronRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-800 
                       hover:from-red-700 hover:to-red-900 text-white px-8 py-4 rounded-xl 
                       font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span>Alle Fahrzeuge anzeigen</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cars;
