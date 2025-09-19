import React from 'react'

const brands = [
  {
    name: 'Audi',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/audi.png'
  },
  {
    name: 'BMW',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw.png'
  },
  {
    name: 'Mercedes',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mercedes-benz.png'
  },
  {
    name: 'Porsche',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/porsche.png'
  },
  {
    name: 'Tesla',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tesla.png'
  },
  {
    name: 'Lexus',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lexus.png'
  },
  {
    name: 'Jaguar',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jaguar.png'
  },

  // doubling set for smooth scrolling
  {
    name: 'Audi',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/audi.png'
  },
  {
    name: 'BMW',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw.png'
  },
  {
    name: 'Mercedes',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png'
  },
  {
    name: 'Porsche',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/porsche.png'
  },
  {
    name: 'Tesla',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tesla.png'
  },
  {
    name: 'Lexus',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lexus.png'
  },
  {
    name: 'Jaguar',
    src: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jaguar.png'
  }
]

export default function BrandShowcase() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-900 py-4 overflow-hidden">
      {/* Overlays fade */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-20" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-20" />

      <div className="overflow-hidden">
        <div className="flex animate-marquee space-x-8 px-16" style={{willChange: 'transform'}}>
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-black/30 shadow-md hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.7)] transition-transform duration-500 ease-in-out flex items-center justify-center cursor-pointer"
              title={brand.name}
            >
              <img
                src={brand.src}
                alt={brand.name}
                draggable={false}
                className="max-w-14 max-h-14 md:max-w-20 md:max-h-20 select-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Keyframes za marquee */}
      <style jsx="true">{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
