import axios from 'axios';
import { mapCarValues } from './mapper';

// Mobile.de API servis za dohvaćanje podataka kroz proxy server
class MobileApiService {
  constructor() {
    // Koristi environment variable za production ili localhost za development
    this.proxyUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5003';
    this.isLoading = false;
    this.lastError = null;

    // UKLANJAMO axios interceptors koji prave CORS probleme
    console.log('🔧 MobileApiService inicijalizovan - bez interceptors');
  }

  // Fetch cars with filters - nova metoda
  // async fetchCarsWithFilters(params = {}) {
  //   try {
  //     console.log('🔍 Dohvaćam automobile s filterima:', params);

  //     const queryParams = new URLSearchParams();

  //     // Dodaj osnovne parametre
  //     queryParams.append('pageNumber', params.pageNumber || 1);
  //     queryParams.append('pageSize', params.pageSize || 20);

  //     // Dodaj filtere ako postoje
  //     if (params.make) queryParams.append('make', params.make);
  //     if (params.model) queryParams.append('model', params.model);
  //     if (params.priceFrom) queryParams.append('priceFrom', params.priceFrom);
  //     if (params.priceTo) queryParams.append('priceTo', params.priceTo);
  //     if (params.yearFrom) queryParams.append('yearFrom', params.yearFrom);
  //     if (params.yearTo) queryParams.append('yearTo', params.yearTo);
  //     if (params.fuel) queryParams.append('fuel', params.fuel);
  //     if (params.transmission) queryParams.append('transmission', params.transmission);
  //     if (params.mileageFrom) queryParams.append('mileageFrom', params.mileageFrom);
  //     if (params.mileageTo) queryParams.append('mileageTo', params.mileageTo);

  //     const url = `${this.proxyUrl}/api/cars?${queryParams.toString()}`;
  //     console.log('📡 API URL:', url);

  //     const response = await axios.get(url, {
  //       timeout: 15000,
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     console.log('✅ API odgovor prima:', response.data);

  //     if (response.data && response.data.ads) {
  //       return {
  //         success: true,
  //         cars: response.data.ads,
  //         total: response.data.total || 0,
  //         currentPage: params.pageNumber || 1,
  //         totalPages: Math.ceil((response.data.total || 0) / (params.pageSize || 20)),
  //         hasMore: response.data.ads.length === (params.pageSize || 20)
  //       };
  //     } else {
  //       return {
  //         success: false,
  //         cars: [],
  //         total: 0,
  //         error: 'Nema podataka'
  //       };
  //     }

  //   } catch (error) {
  //     console.error('💥 Greška pri dohvaćanju s filterima:', error);
  //     return {
  //       success: false,
  //       cars: [],
  //       total: 0,
  //       error: error.message
  //     };
  //   }
  // }

  // Provjeri mrežnu povezanost
  // async checkNetworkConnection() {
  //   try {
  //     const response = await axios.get(`${this.proxyUrl}/health`, {
  //       timeout: 5000
  //     });
  //     return response.status === 200;
  //   } catch (error) {
  //     console.warn('⚠️ Proxy server nedostupan:', error.message);
  //     return false;
  //   }
  // }

  // Retry logika s eksponencijalnim backoff-om
  // async retryWithBackoff(fn, maxRetries = 3) {
  //   for (let attempt = 1; attempt <= maxRetries; attempt++) {
  //     try {
  //       return await fn();
  //     } catch (error) {
  //       if (attempt === maxRetries) {
  //         throw error;
  //       }

  //       const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
  //       console.log(`🔄 Pokušaj ${attempt} neuspješan, čeka se ${delay}ms...`);
  //       await new Promise(resolve => setTimeout(resolve, delay));
  //     }
  //   }
  // }

  // Validiraj mobile.de odgovor
  // validateMobileResponse(data) {
  //   if (!data) {
  //     throw new Error('Nema podataka u odgovoru');
  //   }

  //   if (!data.ads || !Array.isArray(data.ads)) {
  //     throw new Error('Nevažeći format podataka - nema oglasa');
  //   }

  //   if (data.ads.length === 0) {
  //     console.warn('⚠️ API vratio prazan niz oglasa');
  //   }

  //   return true;
  // }

  // Glavni API poziv za dohvaćanje automobila
  async fetchCarsFromMobileApi(pageNumber = 1, pageSize = 20, make = '', model = '', gearbox = '', fuel = '', priceFrom = 0, priceTo = 999999, yearFrom = 0, yearTo = 2030) {
    this.isLoading = true;
    this.lastError = null;

    try {
      console.log(`🚗 Fetching cars from Mobile API (page ${pageNumber}, pageSize ${pageSize})...`);

      // Construct the API URL
      const apiUrl = `${this.proxyUrl}/api/cars?pageNumber=${pageNumber}&pageSize=${pageSize}&make=${make}&model=${model}&gearbox=${gearbox}&fuel=${fuel}&priceFrom=${priceFrom}&priceTo=${priceTo}&yearFrom=${yearFrom}&yearTo=${yearTo}`;

      // Make the API call using axios
      const response = await axios.get(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 15000, // Set a timeout of 15 seconds
      });

      console.log('✅ API response received:', response.data);

      // Check if the response contains valid data
      if (response.data && response.data.ads) {
        // Transform the data for the React app
        const transformedCars = response.data.ads?.map(car => mapCarValues(car))
        // console.log(`✅ Page ${pageNumber}: ${transformedData.cars.length} cars fetched`);

        return { ...response.data, ads: transformedCars };
      } else {
        console.warn('⚠️ No ads found in the API response');
        //NEED TO RETURN EMPTY DATA
        // return this.getFallbackData(pageNumber);
      }
    } catch (error) {
      console.error('❌ Error fetching cars from Mobile API:', error.message);
      this.lastError = error;

      // Return fallback data in case of an error
      //NEED TO RETURN EMPTY DATA
      // return this.getFallbackData(pageNumber);
    } finally {
      this.isLoading = false;
    }
  }

  // Transformiraj mobile.de podatke u format koji očekuje React app
  // transformMobileData(mobileData, currentPage) {
  //   // Samo logiramo za debugging ako je potrebno
  //   if (currentPage === 1) {
  //     console.log('🔄 Transformišem mobile.de podatke...');
  //   }

  //   const ads = mobileData.ads || [];
  //   console.log(`📊 Broj oglasa: ${ads.length}`);
  //   console.log("mobileData.ads")
  //   console.log(mobileData.ads)
  //   const transformedCars = ads.map((ad, index) => {
  //     console.log(`🔍 Obrađujem oglas ${index + 1}:`, ad);

  //     // Mobile.de koristi FLAT strukturu - podaci su direktno na root objektu
  //     const make = ad.make || 'Nepoznata marka';
  //     const model = ad.model || ad.modelDescription || 'Nepoznat model';
  //     const year = ad.firstRegistration ? parseInt(ad.firstRegistration.substring(0, 4)) : new Date().getFullYear();
  //     const price = this.mapMobilePrice(ad.price);
  //     const mileage = ad.mileage || 0;
  //     const fuel = this.mapFuelType(ad.fuel);
  //     const transmission = this.mapTransmissionType(ad.gearbox);
  //     const power = ad.power || 0;
  //     const location = ad.seller?.address?.city || 'Deutschland';

  //     console.log(`✅ Mapiran auto: ${make} ${model} (${year}) - €${price}`);

  //     return {
  //       id: ad.mobileAdId || ad['@key'] || `mobile-${currentPage}-${index}`,
  //       make: make,
  //       model: model,
  //       year: year,
  //       price: price,
  //       currency: ad.price?.currency || 'EUR',
  //       mileage: mileage,
  //       fuel: fuel,
  //       transmission: transmission,
  //       power: power,
  //       doors: 4,
  //       color: 'Schwarz',
  //       location: location,
  //       description: ad.modelDescription || `${make} ${model} aus ${year}. Kilometerstand: ${mileage.toLocaleString()} km, Kraftstoff: ${fuel}`,
  //       images: this.mapMobileImages(ad.images, make, model),
  //       detailsUrl: ad.detailPageUrl || '#',
  //       seller: {
  //         name: 'GM-TOP-CARS',
  //         phone: '+49',
  //         email: 'info@gm-top-cars.de',
  //         location: location
  //       },
  //       features: [],
  //       condition: ad.condition === 'USED' ? 'Gebraucht' : 'Neu',
  //       category: ad.category || 'PKW'
  //     };
  //   });

  //   console.log(`✅ Transformirano ${transformedCars.length} automobila`);

  //   return {
  //     cars: transformedCars,
  //     totalCount: mobileData.total || transformedCars.length,
  //     currentPage: currentPage,
  //     totalPages: Math.ceil((mobileData.total || 100) / 20),
  //     hasNextPage: transformedCars.length >= 20,
  //     apiSource: 'mobile.de',
  //     lastUpdate: new Date().toISOString()
  //   };
  // }


  // Mapiraj Mobile.de slike u format aplikacije
  // mapMobileImages(mobileImages, make, model) {
  //   console.log(`🖼️ Mapiram slike za ${make} ${model}:`, mobileImages);

  //   if (!mobileImages || !Array.isArray(mobileImages) || mobileImages.length === 0) {
  //     console.warn(`⚠️ Nema slika za ${make} ${model}, koristim fallback`);
  //     return this.generateCarImages(make, model);
  //   }

  //   // Mobile.de slike imaju različite veličine (xxxl, xxl, xl, l, m, s, icon)
  //   const mappedImages = mobileImages.map((img, index) => {
  //     // Preferencija za veće slike
  //     const imageUrl = img.xxxl || img.xxl || img.xl || img.l || img.m || img.s || img.icon;

  //     console.log(`📸 Slika ${index + 1}: ${imageUrl}`);

  //     return {
  //       id: index + 1,
  //       url: imageUrl,
  //       alt: `${make} ${model} - Slika ${index + 1}`,
  //       thumbnail: img.m || img.s || img.icon || imageUrl,
  //       hash: img.hash
  //     };
  //   });

  //   console.log(`✅ Mapirano ${mappedImages.length} slika za ${make} ${model}`);
  //   return mappedImages;
  // }

  // Mapiraj Mobile.de cijene u format aplikacije  
  // mapMobilePrice(priceObj) {
  //   if (!priceObj || typeof priceObj !== 'object') {
  //     console.warn('⚠️ Nema cijene, koristim placeholder');
  //     return Math.floor(Math.random() * 50000) + 10000;
  //   }

  //   // Mobile.de struktura: { consumerPriceGross: "38999.00", consumerPriceNet: "32772.27", currency: "EUR" }
  //   let priceValue = 0;

  //   if (priceObj.consumerPriceGross) {
  //     priceValue = parseFloat(priceObj.consumerPriceGross);
  //   } else if (priceObj.consumerPriceNet) {
  //     priceValue = parseFloat(priceObj.consumerPriceNet);
  //   }

  //   console.log(`💰 Mapirana cijena: €${priceValue}`);
  //   return priceValue || Math.floor(Math.random() * 50000) + 10000;
  // }

  // Generiraj slike automobila putem proxy-ja (rješava CORS/CORB)
  // generateCarImages(make, model) {
  //   // Koristi naš backend proxy za slike umjesto direktno Unsplash
  //   const proxyUrl = `${this.proxyUrl}/api/image-proxy`;
  //   const searchTerms = [
  //     `${make}+${model}+car`,
  //     `${make}+car`,
  //     `luxury+car`,
  //     `${model}+vehicle`,
  //     `premium+automobile`
  //   ];

  //   return Array.from({ length: 5 }, (_, i) => {
  //     const searchTerm = searchTerms[i] || `car+automobile`;
  //     const unsplashUrl = `https://source.unsplash.com/800x600/?${searchTerm}&sig=${Date.now()}-${i}`;

  //     return {
  //       id: i + 1,
  //       url: `${proxyUrl}?url=${encodeURIComponent(unsplashUrl)}`,
  //       alt: `${make} ${model} - Slika ${i + 1}`,
  //       thumbnail: `${proxyUrl}?url=${encodeURIComponent(unsplashUrl)}`
  //     };
  //   });
  // }

  // Dohvati detalje pojedinog automobila
  async fetchCarDetails(carId) {
    try {
      console.log(`🔍 Dohvaćam detalje automobila ID: ${carId}`);

      const url = `${this.proxyUrl}/api/cars/${carId}`;
      console.log('📡 Car details URL:', url);

      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Car details odgovor:', response.data);

      if (response.data) {
        // Some backends return { success, data }, others return the raw object
        if (response.data.success && response.data.data) {
          const mapped = mapCarValues(response.data.car);

          return { ...response.data, car: mapped };
        }

        // If it's a raw object, just map it directly
        const mapped = mapCarValues(response.data.car);

        return { ...response.data, car: mapped };
      } else {
        throw new Error('Prazan odgovor sa API-ja');
      }

    } catch (error) {
      console.error('❌ Greška pri dohvaćanju car details:', error);
      this.lastError = error;

      // Vratiti fallback ili re-throw error
      throw new Error(`Neuspješno dohvaćanje detalja automobila: ${error.message}`);
    }
  }

  // Fallback podatci u slučaju greške
  // getFallbackData(page) {
  //   console.log('🔄 Koristim fallback podatke...');

  //   return {
  //     cars: [],
  //     totalCount: 0,
  //     currentPage: page,
  //     totalPages: 1,
  //     hasNextPage: false,
  //     apiSource: 'fallback',
  //     lastUpdate: new Date().toISOString(),
  //     error: this.lastError?.message || 'API trenutno nije dostupan'
  //   };
  // }

  // Glavni interfejs za React komponentu
  // async fetchCarsForReact(page = 1) {
  //   try {
  //     console.log(`📱 React poziva dohvaćanje automobila - stranica ${page}`);

  //     const result = await this.fetchCarsFromMobileApi(page, 20);

  //     // Dodaj njemačke labele
  //     result.germanLabels = {
  //       page: 'Seite',
  //       of: 'von',
  //       cars: 'Fahrzeuge',
  //       total: 'Gesamt',
  //       loading: 'Laden...',
  //       error: 'Fehler',
  //       retry: 'Wiederholen'
  //     };

  //     return result;
  //   } catch (error) {
  //     console.error('❌ React API greška:', error);
  //     //NEED TO RETURN EMPTY DATA
  //     // return this.getFallbackData(page);
  //   }
  // }

  // Dohvati 6 najskupljih automobila
  async fetchTopExpensiveCars() {
    try {
      console.log('🔍 Dohvaćam 6 najskupljih automobila...');

      const url = `${this.proxyUrl}/api/cars/top/expensive`;
      console.log('📡 Top expensive cars URL:', url);

      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Top expensive cars odgovor:', response.data);

      if (response.data && response.data.success) {
        const mappedCars = response.data.cars.map(car => mapCarValues(car))
        return {
          success: true,
          cars: mappedCars || [],
          total: response.data.total || 0,
          category: 'najskupljih-6',
          source: 'api',
          cached: response.data.cached || false
        };
      } else {
        throw new Error(response.data?.error || 'Najskuplji automobili nisu pronađeni');
      }

    } catch (error) {
      console.error('❌ Greška pri dohvaćanju najskupljih automobila:', error);
      this.lastError = error;

      // Fallback - prazan rezultat
      return {
        success: false,
        cars: [],
        total: 0,
        category: 'najskupljih-6',
        source: 'fallback',
        error: error.message
      };
    }
  }

  // Fetch unique car makes
  async fetchUniqueCarMakes() {
    try {
      console.log('🔍 Fetching unique car makes from API...');

      const url = `${this.proxyUrl}/api/cars/make`; // API endpoint for unique car makes
      console.log('📡 Unique car makes URL:', url);

      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Unique car makes response:', response.data);

      if (response.data && response.data.data) {
        return response.data.data; // Return the array of unique car makes
      } else {
        throw new Error('No data found for car makes');
      }
    } catch (error) {
      console.error('❌ Error fetching unique car makes:', error.message);
      throw new Error(`Failed to fetch car makes: ${error.message}`);
    }
  }

  // Fetch unique car gearboxes
  async fetchCarGearbox() {
    try {
      console.log('🔍 Fetching unique car gearbox from API...');

      const url = `${this.proxyUrl}/api/cars/gearbox`; // API endpoint for unique car makes
      console.log('📡 Unique car gearbox URL:', url);

      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Unique car gearbox response:', response.data);

      if (response.data && response.data.data) {
        return response.data.data; // Return the array of unique car gearbox
      } else {
        throw new Error('No data found for car gearbox');
      }
    } catch (error) {
      console.error('❌ Error fetching unique car gearbox:', error.message);
      throw new Error(`Failed to fetch car gearbox: ${error.message}`);
    }
  }

  // Fetch unique car fuel
  async fetchCarFuel() {
    try {
      console.log('🔍 Fetching unique car fuels from API...');

      const url = `${this.proxyUrl}/api/cars/fuel`; // API endpoint for unique car makes
      console.log('📡 Unique car fuel URL:', url);

      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Unique car fuel response:', response.data);

      if (response.data && response.data.data) {
        return response.data.data; // Return the array of unique car fuel
      } else {
        throw new Error('No data found for car fuel');
      }
    } catch (error) {
      console.error('❌ Error fetching unique car fuel:', error.message);
      throw new Error(`Failed to fetch car fuel: ${error.message}`);
    }
  }


  async fetchCarModels(make) {
    if (!make) {
      throw new Error('Car make is required to fetch models');
    }

    try {
      console.log(`🔍 Fetching car models for make: ${make}`);

      const url = `${this.proxyUrl}/api/cars/models?make=${encodeURIComponent(make)}`;
      console.log('📡 Car models URL:', url);

      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Car models response:', response.data);

      if (response.data && response.data.data) {
        return response.data.data; // Return the array of car models
      } else {
        throw new Error('No data found for car models');
      }
    } catch (error) {
      console.error('❌ Error fetching car models:', error.message);
      throw new Error(`Failed to fetch car models: ${error.message}`);
    }
  }

  async sendContactData({ name, email, message }) {
    try {
      console.log(`📨 Sende Kontaktformular: ${name}, ${email}`);

      const url = `${this.proxyUrl}/api/send`;
      console.log('📡 Kontaktformular-URL:', url);

      const response = await axios.post(
        url,
        { name, email, message },
        {
          timeout: 15000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Antwort vom Server:', response.data);

      return response.data;
    } catch (error) {
      console.error('Kontaktformular Fehler:', error);
      throw error;
    }
  }

  // Status provjera
  // getStatus() {
  //   return {
  //     isLoading: this.isLoading,
  //     lastError: this.lastError,
  //     proxyUrl: this.proxyUrl
  //   };
  // }
}

// Eksportiraj singleton instancu
const mobileApiService = new MobileApiService();
export default mobileApiService;
