import React from 'react';

const brands = [
  {
    name: 'BMW',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    name: 'Mercedes-Benz',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    name: 'Audi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    name: 'Porsche',
    logo: 'https://cdn.worldvectorlogo.com/logos/porsche.svg',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    name: 'Volkswagen',
    logo: 'https://cdn.worldvectorlogo.com/logos/volkswagen-vw.svg',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    name: 'Ford',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    name: 'Toyota',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Toyota_Logo.svg',
    gradient: 'from-red-600 to-red-800'
  },
  {
    name: 'Honda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Honda_logo.svg',
    gradient: 'from-gray-700 to-black'
  },
  {
    name: 'Hyundai',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Hyundai_Motor_Company_logo.svg',
    gradient: 'from-blue-400 to-blue-700'
  },
  {
    name: 'Nissan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nissan-logo.svg',
    gradient: 'from-gray-600 to-gray-800'
  },
  {
    name: 'Opel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Opel-logo-2017.svg',
    gradient: 'from-yellow-400 to-yellow-700'
  },
  {
    name: 'Škoda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Skoda_logo_III.svg',
    gradient: 'from-green-500 to-green-700'
  },
  {
    name: 'SEAT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/SEAT_logo.svg',
    gradient: 'from-red-500 to-red-700'
  },
  {
    name: 'Peugeot',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Peugeot_logo_%282021%29.svg',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Citroën',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Citroen_logo.svg',
    gradient: 'from-red-400 to-red-600'
  },
  {
    name: 'Renault',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Renault_logo.svg',
    gradient: 'from-yellow-500 to-yellow-700'
  }
];

export default function Brands() {
  // Dupliramo marke za infinity scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="bg-black py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Premium Auto Marke
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Nudimo najkvalitetnije automobile vodećih svjetskih proizvođača
        </p>
      </div>

      <div className="relative">
        {/* Prvi red - kreće se lijevo */}
        <div className="flex animate-infinite-scroll-left gap-6 md:gap-8 mb-8">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`row1-${index}`}
              className={`bg-gradient-to-br ${brand.gradient} p-6 md:p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px] md:min-w-[250px] group`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/10 p-4 md:p-6 rounded-xl mb-4 group-hover:bg-white/20 transition-colors">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain filter brightness-0 invert"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {brand.name}
                </h3>
                <p className="text-white/80 text-sm mt-2">Premium kvaliteta</p>
              </div>
            </div>
          ))}
        </div>

        {/* Drugi red - kreće se desno */}
        <div className="flex animate-infinite-scroll-right gap-6 md:gap-8">
          {duplicatedBrands.reverse().map((brand, index) => (
            <div
              key={`row2-${index}`}
              className={`bg-gradient-to-br ${brand.gradient} p-6 md:p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px] md:min-w-[250px] group`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/10 p-4 md:p-6 rounded-xl mb-4 group-hover:bg-white/20 transition-colors">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain filter brightness-0 invert"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {brand.name}
                </h3>
                <p className="text-white/80 text-sm mt-2">Premium kvaliteta</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlay za fade effect */}
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
}
