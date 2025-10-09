// Test script za Trade-In API
const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function testTradeInAPI() {
  const formData = new FormData();
  
  // Dodaj test podatke
  formData.append('name', 'Test Korisnik');
  formData.append('email', 'test@example.com');
  formData.append('phone', '+49123456789');
  formData.append('message', 'Test poruka');
  formData.append('gender', 'Herr');
  
  // Car podatci
  formData.append('carId', '438454185');
  formData.append('carMake', 'BMW');
  formData.append('carModel', 'X5');
  formData.append('carPrice', '45000');
  
  // Trade-in podatci
  formData.append('tradeInBrand', 'Audi');
  formData.append('tradeInModel', 'A4');
  formData.append('tradeInYear', '2020');
  formData.append('tradeInMileage', '50000');
  formData.append('tradeInFuel', 'Benzin');
  formData.append('tradeInCondition', 'Gut');
  formData.append('tradeInVIN', 'TEST123456789');
  formData.append('tradeInRegistration', '2020-01-15');
  
  try {
    const response = await fetch('http://localhost:5003/api/send-tradein', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log('✅ Response:', result);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testTradeInAPI();