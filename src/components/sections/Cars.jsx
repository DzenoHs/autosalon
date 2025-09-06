import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, Gauge, Fuel, Settings, Eye } from "lucide-react";

const Cars = () => {
  const navigate = useNavigate();
  const [hoveredCar, setHoveredCar] = useState(null);

  const cars = [
    {
      id: 1,
      name: "BMW X5 M50d",
      year: 2023,
      km: 15000,
      priceNet: 75000,
      priceGross: 89250,
      fuel: "Diesel",
      gearbox: "Automatik",
      engine: "3.0L TwinTurbo",
      img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"
    },
    {
      id: 2,
      name: "Mercedes-AMG C63 S",
      year: 2022,
      km: 25000,
      priceNet: 68000,
      priceGross: 80920,
      fuel: "Benzin",
      gearbox: "Automatik",
      engine: "4.0L V8 Biturbo",
      img: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?w=800&q=80"
    },
    {
      id: 3,
      name: "Audi RS6 Avant",
      year: 2023,
      km: 8000,
      priceNet: 92000,
      priceGross: 109480,
      fuel: "Benzin",
      gearbox: "Automatik",
      engine: "4.0L V8 TFSI",
      img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
    },
    {
      id: 4,
      name: "Porsche 911 Turbo S",
      year: 2023,
      km: 5000,
      priceNet: 145000,
      priceGross: 172550,
      fuel: "Benzin",
      gearbox: "PDK",
      engine: "3.8L Flat-6",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    {
      id: 5,
      name: "Tesla Model S Plaid",
      year: 2023,
      km: 12000,
      priceNet: 98000,
      priceGross: 116620,
      fuel: "Elektro",
      gearbox: "Automatik",
      engine: "Tri-Motor",
      img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
    },
    {
      id: 6,
      name: "Range Rover Sport SVR",
      year: 2022,
      km: 18000,
      priceNet: 85000,
      priceGross: 101150,
      fuel: "Benzin",
      gearbox: "Automatik",
      engine: "5.0L V8 SC",
      img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"
    }
  ];

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleViewAll = () => {
    navigate('/cars');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price);
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden">
      {/* Background effects - samo pulse, bez ping animacije */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-500 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              UNSERE
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
              FAHRZEUGE
            </span>
          </h2>
          
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mx-auto mb-8 rounded-full shadow-lg w-56"></div>
          
          <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto font-medium">
            <span className="text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
              Premium Fahrzeuge für anspruchsvolle Kunden
            </span>
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {cars.map((car, index) => (
            <div
              key={car.id}
              onMouseEnter={() => setHoveredCar(car.id)}
              onMouseLeave={() => setHoveredCar(null)}
              className="group relative bg-gradient-to-br from-neutral-900 via-black to-neutral-800 rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 hover:border-neutral-600 cursor-pointer transform hover:-translate-y-2 hover:scale-102 transition-transform duration-300 ease-out"
            >
              {/* Glowing effect - lagana tranzicija */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-yellow-500/10 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                {/* Car Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-colors duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                    €{formatPrice(car.priceGross)}
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {car.name}
                  </h3>

                  {/* Car Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      <Calendar size={16} className="text-red-500" />
                      <span className="text-sm font-medium">{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      <Gauge size={16} className="text-yellow-500" />
                      <span className="text-sm font-medium">{formatPrice(car.km)} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      <Fuel size={16} className="text-blue-500" />
                      <span className="text-sm font-medium">{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      <Settings size={16} className="text-green-500" />
                      <span className="text-sm font-medium">{car.gearbox}</span>
                    </div>
                  </div>

                  {/* Engine Info */}
                  <div className="mb-6 p-3 bg-neutral-800/50 rounded-xl border border-neutral-700">
                    <p className="text-gray-300 text-sm font-medium">{car.engine}</p>
                  </div>

                  {/* Prices */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Netto:</span>
                      <span className="text-white font-bold">€{formatPrice(car.priceNet)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Brutto:</span>
                      <span className="text-white font-bold text-lg">€{formatPrice(car.priceGross)}</span>
                    </div>
                  </div>

                  {/* Details Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCarClick(car.id);
                    }}
                    className="w-full bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 text-white py-4 px-6 rounded-xl font-bold text-base shadow-xl hover:shadow-red-500/25 transition-all duration-200 flex items-center justify-center gap-3 group/btn relative overflow-hidden min-h-[56px] hover:from-yellow-500 hover:via-red-600 hover:to-red-500 hover:scale-105 active:scale-95"
                  >
                    <Eye className="group-hover/btn:scale-110 transition-transform duration-200" size={20} />
                    <span>Details ansehen</span>
                    <ChevronRight className="group-hover/btn:translate-x-1 transition-transform duration-200" size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-red-500/30 transition-all duration-200 group relative overflow-hidden min-h-[72px] hover:from-yellow-500 hover:via-red-600 hover:to-red-500 hover:scale-105 hover:-translate-y-1 active:scale-95"
          >
            <span>Alle Fahrzeuge ansehen</span>
            <ChevronRight 
              size={28} 
              className={`transition-transform duration-200 ${hoveredCar ? "translate-x-1" : ""}`} 
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cars;
