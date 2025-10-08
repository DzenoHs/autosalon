# TradeInPage Backend Integration - Dokumentacija

## 📋 **Pregled**
TradeInPage komponenta šalje podatke na backend rute `/api/send-tradein` sa kompletnim podacima o korisnikovom vozilu za inzahlungnahme.

## 🔄 **Frontend -> Backend Data Flow**

### **1. Form Data Structure (frontend state)**
```javascript
// Lični podaci
personalData: {
  gender: 'Herr' | 'Frau',
  name: string,
  email: string,
  phone: string,
  message: string
}

// Podaci o vozilu koje korisnik želi da tausuje (trade-in)
vehicleData: {
  tradeInBrand: string,
  tradeInModel: string,
  tradeInYear: string,
  tradeInMileage: string,
  tradeInFuel: 'Benzin' | 'Diesel' | 'Elektro' | 'Hybrid' | 'Gas',
  tradeInCondition: 'Sehr gut' | 'Gut' | 'Befriedigend' | 'Reparaturbedürftig',
  tradeInVIN: string,
  tradeInRegistration: string
}

// File uploads
files: {
  vehicleImages: File[],     // Slike vozila
  vehicleDocuments: File[]   // Dokumenti (PDF, DOC)
}
```

### **2. API Call Details**
- **Endpoint**: `POST /api/send-tradein`
- **Content-Type**: `multipart/form-data` (zbog file upload-a)
- **Trenutno**: Simuliran poziv (development mode)
- **Potrebno**: Zamena sa stvarnim API pozivom

### **3. FormData struktura koja se šalje**
```javascript
const formData = new FormData();

// Lični podaci
formData.append('name', personalData.name);
formData.append('email', personalData.email);
formData.append('phone', personalData.phone);
formData.append('message', personalData.message);
formData.append('gender', personalData.gender);

// ID vozila koje se kupuje (iz URL parametra)
formData.append('carId', id);

// Podaci o trade-in vozilu
formData.append('tradeInBrand', vehicleData.tradeInBrand);
formData.append('tradeInModel', vehicleData.tradeInModel);
formData.append('tradeInYear', vehicleData.tradeInYear);
formData.append('tradeInMileage', vehicleData.tradeInMileage);
formData.append('tradeInFuel', vehicleData.tradeInFuel);
formData.append('tradeInCondition', vehicleData.tradeInCondition);
formData.append('tradeInVIN', vehicleData.tradeInVIN);
formData.append('tradeInRegistration', vehicleData.tradeInRegistration);

// Files
files.vehicleImages.forEach((file, index) => {
  formData.append(`vehicleImages`, file);
});
files.vehicleDocuments.forEach((file, index) => {
  formData.append(`vehicleDocuments`, file);
});
```

## 🎯 **Šta backend treba da uradi**

### **1. Route Handler** 
- ✅ **Postoji**: `/api/send-tradein` u `backend/index.js`
- ✅ **Multer setup**: Konfigurisan za file upload
- ✅ **Controller**: `backend/controllers/sendTradeInEmail.js`

### **2. Email Template**
- Poslati email na: `laurin.miftari@gmx.de`
- Sadržaj treba da sadrži:
  - Lične podatke korisnika
  - Detalje o vozilu koje se kupuje (car ID)
  - Detalje o trade-in vozilu
  - Priložene fajlove

### **3. Expected Response**
```javascript
// Uspešan odgovor
{
  success: true,
  message: "Email erfolgreich gesendet"
}

// Neuspešan odgovor
{
  success: false,
  message: "Fehler beim Senden der E-Mail"
}
```

## 🔧 **Frontend Integration**

### **Trenutno stanje (simulacija):**
```javascript
const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitStatus(null);

  // Simulacija loading-a za development
  setTimeout(() => {
    setSubmitStatus('development');
    setIsSubmitting(false);
  }, 2000);
};
```

### **Potrebna promena:**
```javascript
const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    const formData = new FormData();
    
    // Dodati sve podatke u FormData (kao što je gore dokumentovano)
    // ... 

    const response = await fetch('/api/send-tradein', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    console.error('Error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

## 📁 **File Upload Handling**
- **Podržani tipovi**: 
  - Slike: `image/*` (JPEG, PNG)
  - Dokumenti: `.pdf,.doc,.docx`
- **Max file size**: 10 MB
- **Multiple files**: Da, korisnik može da upload-uje više fajlova

## 🚀 **Status Messages**
Frontend očekuje ove statuse:
- `'success'` - Prikazuje zelenu poruku "Anfrage erfolgreich gesendet!"
- `'error'` - Prikazuje crvenu poruku "Fehler beim Senden"
- `'development'` - Trenutni development mode sa žutom porukom

## 📧 **Email Sadržaj (predlog)**
```
Betreff: Inzahlungnahme Anfrage - [Fahrzeug Name]

Sehr geehrte Damen und Herren,

[Anrede] [Name] möchte eine Inzahlungnahme für folgendes Fahrzeug anfragen:

INTERESSIERTES FAHRZEUG:
- Fahrzeug ID: [carId]

KONTAKTDATEN:
- Name: [name]
- E-Mail: [email] 
- Telefon: [phone]

TRADE-IN FAHRZEUG:
- Marke: [tradeInBrand]
- Modell: [tradeInModel]
- Baujahr: [tradeInYear]
- Kilometer: [tradeInMileage]
- Kraftstoff: [tradeInFuel]
- Zustand: [tradeInCondition]
- VIN: [tradeInVIN]
- Erstzulassung: [tradeInRegistration]

NACHRICHT:
[message]

ANHÄNGE:
[Liste der uploaded files]

Mit freundlichen Grüßen,
Autohouse Miftari Website
```

## ✅ **Backend Status**
- ✅ **Route je implementirana**: `/api/send-tradein` u `backend/index.js`
- ✅ **Controller postoji**: `backend/controllers/sendTradeInEmail.js`
- ✅ **Multer setup**: Konfigurisan za file upload (10MB limit, 20 fajlova max)
- ✅ **Email template**: Implementiran sa German sadržajem
- ✅ **Error handling**: Dodato
- ✅ **File types**: PDF, DOC, DOCX, images
- ✅ **Response format**: { success: true/false, message: string }

## 🔧 **Šta treba da uradi Backend Dev**

### **1. Environment Variables (.env file)**
✅ **VEĆ KONFIGURISANO** u `backend/.env`:
```
EMAIL_USER=info@autohausmiftari.de
EMAIL_PASSWORD=ncadminmail2025
EMAIL_HOST=mail.privateemail.com
EMAIL_RECIPITENT=info@autohausmiftari.de
```

**✅ POTVRĐENO**: Podaci će stizati na `info@autohausmiftari.de`

### **2. Testiranje**
- Pokrenuti backend server
- Testirati da li emails stižu na **info@autohausmiftari.de**
- Proveriti file upload functionality

### **3. Frontend integracija - READY TO GO!**

**Trenutno stanje**: Frontend je spreman, samo treba zameniti simulaciju sa API pozivom.

**Lokacija**: `frontend/src/pages/TradeInPage.jsx` - linija ~130-140

**Zamena**:
```javascript
// UMESTO ove simulacije:
setTimeout(() => {
  setSubmitStatus('development');
  setIsSubmitting(false);
}, 2000);

// STAVITI ovaj kod:
try {
  const formData = new FormData();
  
  // Lični podaci
  formData.append('name', personalData.name);
  formData.append('email', personalData.email);
  formData.append('phone', personalData.phone);
  formData.append('message', personalData.message);
  formData.append('gender', personalData.gender);
  
  // Car ID
  formData.append('carId', id);
  
  // Trade-in podatci
  formData.append('tradeInBrand', vehicleData.tradeInBrand);
  formData.append('tradeInModel', vehicleData.tradeInModel);
  formData.append('tradeInYear', vehicleData.tradeInYear);
  formData.append('tradeInMileage', vehicleData.tradeInMileage);
  formData.append('tradeInFuel', vehicleData.tradeInFuel);
  formData.append('tradeInCondition', vehicleData.tradeInCondition);
  formData.append('tradeInVIN', vehicleData.tradeInVIN);
  formData.append('tradeInRegistration', vehicleData.tradeInRegistration);
  
  // Files
  files.vehicleImages.forEach(file => {
    formData.append('vehicleImages', file);
  });
  files.vehicleDocuments.forEach(file => {
    formData.append('vehicleDocuments', file);
  });

  const response = await fetch('/api/send-tradein', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (result.success) {
    setSubmitStatus('success');
  } else {
    setSubmitStatus('error');
  }
} catch (error) {
  console.error('Error:', error);
  setSubmitStatus('error');
} finally {
  setIsSubmitting(false);
}
```

## 🚀 **FINAL CHECKLIST**
1. ✅ Frontend: TradeInPage pixel-perfect design - **GOTOV**
2. ✅ Backend: API endpoint sa email sending - **GOTOV** 
3. ⏳ Integration: Zamena simulacije sa API pozivom - **TREBA 5 MINUTA**
4. ⏳ Testing: Email delivery test na **info@autohausmiftari.de** - **TREBA TESTIRATI**