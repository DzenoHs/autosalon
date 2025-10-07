import nodemailer from 'nodemailer';

export const sendTradeInEmail = async (req, res) => {
  try {
    console.log('🚗 Inzahlungnahme E-Mail Anfrage');
    console.log('Body:', req.body);

    const {
      name, email, phone, message,
      carId, carMake, carModel, carPrice,
      tradeInBrand, tradeInModel, tradeInYear, tradeInMileage,
      tradeInFuel, tradeInCondition, tradeInVIN, tradeInRegistration,
      gender
    } = req.body;

    if (!name || !email || !tradeInBrand || !tradeInModel) {
      return res.status(400).json({ error: 'Erforderliche Daten fehlen.' });
    }

    // Kreiranje email sadržaja
    const emailContent = `
🔄 NEUE INZAHLUNGNAHME ANFRAGE

═══════════════════════════════════════

👤 KUNDENDATEN:
• Anrede: ${gender || 'Nicht angegeben'}
• Name: ${name}
• E-Mail: ${email}
• Telefon: ${phone || 'Nicht angegeben'}

🚙 INTERESSIERTES FAHRZEUG:
• Fahrzeug-ID: ${carId || 'Nicht angegeben'}
• Fahrzeug: ${carMake || ''} ${carModel || ''}
• Preis: ${carPrice ? new Intl.NumberFormat('de-DE').format(carPrice) + ' €' : 'Auf Anfrage'}
• Fahrzeug Link: https://www.autohausmiftari.de/car/${carId}

🚗 INZAHLUNGNAHME FAHRZEUG:
• Marke: ${tradeInBrand}
• Modell: ${tradeInModel}
• Baujahr: ${tradeInYear}
• Kilometerstand: ${tradeInMileage} km
• Kraftstoff: ${tradeInFuel}
• Zustand: ${tradeInCondition}
• FIN/VIN: ${tradeInVIN || 'Nicht angegeben'}
• Erstzulassung: ${tradeInRegistration || 'Nicht angegeben'}

📝 ZUSÄTZLICHE NACHRICHT:
${message || 'Keine zusätzliche Nachricht'}

� KONTAKT:
Für weitere Informationen oder Rückfragen kontaktieren Sie den Kunden direkt.
    `.trim();

    // Email konfiguracija
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_RECIPITENT,
      to: process.env.EMAIL_RECIPITENT,
      subject: `🔄 Inzahlungnahme Anfrage - ${tradeInBrand} ${tradeInModel} (${name})`,
      text: emailContent
    };

    await transporter.sendMail(mailOptions);
    
    console.log('✅ Inzahlungnahme E-Mail erfolgreich gesendet');
    res.status(200).json({ 
      success: true,
      message: 'Inzahlungnahme Anfrage erfolgreich gesendet!'
    });

  } catch (error) {
    console.error('❌ Fehler beim Senden der Inzahlungnahme E-Mail:', error);
    res.status(500).json({ 
      error: 'Fehler beim Senden der Anfrage.',
      details: error.message 
    });
  }
};