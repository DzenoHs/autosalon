import { getPostedMedia, insertPostedMedia } from "./db.js";
import { fetchCarById, fetchCarsFromMobileAPI } from "./mobileAPI.js";
import { postInstagramCarousel } from "./postToInstagram.js";

const norm = (v) => String(v || '').trim().toUpperCase().replace(/\s+/g, '_');

function formatGearbox(gearbox) {
  switch (gearbox) {
    case 'AUTOMATIC_GEAR':
      return 'Automatik';
    case 'MANUAL_GEAR':
      return 'Schaltgetriebe'; // Manual gearbox
    case 'SEMIAUTOMATIC_GEAR':
      return 'Halbautomatik'; // Semi-automatic
    default:
      return gearbox || ''; // fallback
  }
}
function formatPrice(price) {
  if (!price || price === 0) return 'Preis auf Anfrage'
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

// 2) Fuels (goriva)
const FUEL_MAP = {
  PETROL: 'Benzin',
  DIESEL: 'Diesel',
  LPG: 'Autogas (LPG)',
  CNG: 'Erdgas (CNG)',
  ELECTRICITY: 'Elektro',
  HYBRID: 'Hybrid (Benzin/Elektro)',
  HYDROGENIUM: 'Wasserstoff',
  ETHANOL: 'Ethanol (FFV, E85 etc.)',
  HYBRID_DIESEL: 'Hybrid (Diesel/Elektro)',
  OTHER: 'Andere',
};

export function mapFuel(code) {
  if (!code) return 'Benzin';
  const key = norm(code);
  return FUEL_MAP[key] || code;
}

function generateInstagramCaption(car) {
  // Format first registration as MM/YYYY
  const firstReg =
    car.firstRegistration && car.firstRegistration.length === 6
      ? `${car.firstRegistration.slice(4, 6)}/${car.firstRegistration.slice(0, 4)}`
      : car.firstRegistration || '';

  return `
🚗 ${car.make} ${car.model} ${car.trimLine || ''}
💶 Preis Brutto: ${formatPrice(car.price?.consumerPriceGross)}
💶 Preis Netto: ${formatPrice(car.price?.consumerPriceNet)}
📅 Erstzulassung: ${firstReg}
📊 Laufleistung: ${car.mileage?.toLocaleString('de-DE')} km
⚙️ Getriebe: ${formatGearbox(car.gearbox)}
⛽ Kraftstoff: ${mapFuel(car.fuel)}
⚡️ Leistung: ${car.power} kW / ${Math.round(car.power * 1.341)} PS

👉 Jetzt entdecken:
https://autohausmiftari.de/car/${car.mobileAdId}

📞 Autohaus MIFTARI: +49 174 7692697  
🌍 www.autohausmiftari.de

#${car.make} #${car.model} #UsedCars #GermanyCars
`;
}

export const checkCarsAndPostToInstagram = async () => {
  const apiParams = { 'page.number': 1, 'page.size': 300 };

  const { allCars, totalCount } = await fetchCarsFromMobileAPI(apiParams, 5);
  const adsIds = allCars.map(car => car.mobileAdId);

  const postedAds = await getPostedMedia();
  const postedAdIds = postedAds.map(ad => ad.mobileAdId);

  const unpostedAdIds = adsIds.filter(id => !postedAdIds.includes(id));

  console.log('Total ads from API:', adsIds.length);
  console.log('Already posted ads:', postedAdIds.length);
  console.log('Unposted ads to process:', unpostedAdIds.length);

  if (unpostedAdIds.length === 0) {
    console.log('No new ads to post.');
    return;
  }

  // iterate over every unposted ad id and post to Instagram
  for (const adId of unpostedAdIds) {
    try {
      console.log('Processing adId:', adId);

      const carDetails = await fetchCarById(adId);
      if (!carDetails) {
        console.warn('No details returned for', adId);
        // mark as processed to avoid retrying endlessly (optional)
        await insertPostedMedia(adId);
        continue;
      }

      const imageUrls = (carDetails.images || []).slice(0, 10).map(image => image.xxxl).filter(Boolean);
      if (imageUrls.length === 0) {
        console.warn('No images for', adId);
        await insertPostedMedia(adId);
        continue;
      }

      const caption = generateInstagramCaption(carDetails)

      console.log('Posting to Instagram:', adId, 'images:', imageUrls.length);

      // actually post (uncomment if you want to post for real)
      const uploadedData = await postInstagramCarousel({ imageUrls, caption });
      console.log("uploadedData")
      console.log(uploadedData)

      // save posted ad to DB
      await insertPostedMedia({ mobileAdId: adId });

      console.log('Successfully posted and saved:', adId);

      // small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (err) {
      console.error('Error processing adId', adId, err);
      // continue with next id
      continue;
    }
  }

  console.log('checkCarsAndPostToInstagram finished');
};