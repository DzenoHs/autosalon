 import axios from 'axios';
// const axios = require('axios');

const username='REMOVED'
const password='REMOVED'

const credentials=`${username}:${password}`

const encoded= Buffer.from(credentials).toString('base64')

const MOBILE_API_CONFIG = {
  baseURL: 'https://services.mobile.de/search-api/search',
  headers: {
    'Authorization': `Basic ${encoded}`,
    'Accept': 'application/vnd.de.mobile.api+json',
    'User-Agent': 'AutoSalon-Proxy/1.0',
    'Content-Type': 'application/json'
  },
  timeout: 15000
};

export const getCarById = async (req, res) => {
  const startTime = Date.now();
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  try {
    const carId = req.params.id;
    
    if (!carId) {
      return res.status(400).json({
        success: false,
        error: 'Car ID ist erforderlich'
      });
    }

    console.log(`🔍 Lade Details für Auto ID: ${carId}`);

    // Mobile.de API für einzelne Fahrzeuge
    const apiUrl = `https://services.mobile.de/search-api/ad/${carId}`;
    
    let response;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        console.log(`📡 API Aufruf (Versuch ${attempts}): ${apiUrl}`);
        
        response = await axios.get(apiUrl, {
          headers: MOBILE_API_CONFIG.headers,
          timeout: MOBILE_API_CONFIG.timeout,
          validateStatus: (status) => status >= 200 && status < 500
        });

        if (response.status === 200) {
          console.log('✅ Mobile.de API Antwort erhalten');
          break;
        }
        
        if (response.status === 404) {
          console.log('❌ Fahrzeug nicht gefunden (404)');
          return res.status(404).json({
            success: false,
            error: 'Fahrzeug nicht gefunden'
          });
        }
        
        if (attempts === maxAttempts) {
          throw new Error(`API returned status ${response.status}`);
        }
        
      } catch (error) {
        console.error(`❌ API Fehler (Versuch ${attempts}):`, error.message);
        
        if (attempts === maxAttempts) {
          throw error;
        }
        
        // Exponentieller Backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    if (!response || response.status !== 200) {
      throw new Error('Failed to fetch car details from Mobile.de API');
    }

    const carData = response.data;
    
    // Verarbeite und bereinige Fahrzeugdaten
    const processedCar = {
      id: carData.id,
      mobileAdId: carData.id,
      make: carData.specifics?.make?.value || 'Unbekannt',
      model: carData.specifics?.model?.value || 'Unbekannt',
      year: carData.specifics?.firstRegistration ? 
        new Date(carData.specifics.firstRegistration).getFullYear() : null,
      price: carData.price ? {
        value: carData.price.consumerPriceGross || carData.price.value,
        consumerPriceGross: carData.price.consumerPriceGross,
        currency: carData.price.currency || 'EUR'
      } : null,
      mileage: carData.specifics?.mileage || 0,
      fuel: carData.specifics?.fuel?.value || 'Unbekannt',
      gearbox: carData.specifics?.gearbox?.value || 'Unbekannt',
      power: carData.specifics?.power || 0,
      condition: carData.specifics?.condition?.value || 'Unbekannt',
      images: carData.images ? carData.images.map((img, index) => ({
        id: index + 1,
        url: img.uri || img.url,
        alt: `${carData.specifics?.make?.value || 'Auto'} ${carData.specifics?.model?.value || 'Modell'} - Bild ${index + 1}`
      })) : [],
      description: carData.description || carData.plainTextDescription || '',
      plainTextDescription: carData.plainTextDescription || '',
      seller: carData.seller ? {
        name: carData.seller.name || 'Verkäufer',
        phone: carData.seller.phone,
        address: carData.seller.address
      } : null,
      
      // Dodatne specifikacije
      cubicCapacity: carData.specifics?.cubicCapacity,
      doors: carData.specifics?.doors,
      seats: carData.specifics?.seats,
      driveType: carData.specifics?.driveType?.value,
      exteriorColor: carData.specifics?.exteriorColor?.value,
      interiorColor: carData.specifics?.interiorColor?.value,
      interiorType: carData.specifics?.interiorType?.value,
      metallic: carData.specifics?.metallic,
      manufacturerColorName: carData.specifics?.manufacturerColorName,
      
      // Historie i stanje
      numberOfPreviousOwners: carData.specifics?.numberOfPreviousOwners || 0,
      fullServiceHistory: carData.specifics?.fullServiceHistory || false,
      damageUnrepaired: carData.specifics?.damageUnrepaired || false,
      roadworthy: carData.specifics?.roadworthy !== false,
      
      // Emisije
      emissions: carData.specifics?.emissions,
      consumptions: carData.specifics?.consumptions,
      emissionSticker: carData.specifics?.emissionSticker?.value,
      emissionClass: carData.specifics?.emissionClass?.value,
      
      // Sigurnosne značajke
      abs: carData.specifics?.abs || false,
      esp: carData.specifics?.esp || false,
      airbag: carData.specifics?.airbag?.value,
      immobilizer: carData.specifics?.immobilizer || false,
      alarmSystem: carData.specifics?.alarmSystem || false,
      
      // Komfort značajke
      climatisation: carData.specifics?.climatisation?.value,
      electricWindows: carData.specifics?.electricWindows || false,
      centralLocking: carData.specifics?.centralLocking || false,
      electricAdjustableSeats: carData.specifics?.electricAdjustableSeats || false,
      
      // Tehnološke značajke
      onBoardComputer: carData.specifics?.onBoardComputer || false,
      bluetooth: carData.specifics?.bluetooth || false,
      handsFreePhoneSystem: carData.specifics?.handsFreePhoneSystem || false,
      
      // API meta podaci
      source: 'mobile.de',
      lastUpdated: new Date().toISOString()
    };

    const responseTime = Date.now() - startTime;
    console.log(`✅ Car details uspješno obrađeni u ${responseTime}ms`);

    res.status(200).json({
      success: true,
      data: processedCar,
      responseTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('❌ Greška pri dohvaćanju car details:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Neočekivana greška pri dohvaćanju podataka',
      responseTime,
      timestamp: new Date().toISOString()
    });
  }
}