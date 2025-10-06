import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';

// Multer konfiguracija za file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 20 // maksimalno 20 fajlova
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Nepodržan tip fajla!'));
    }
  }
});

export const uploadMiddleware = upload.fields([
  { name: 'vehicleImages', maxCount: 10 },
  { name: 'vehicleDocuments', maxCount: 10 }
]);

export const sendTradeInEmail = async (req, res) => {
  try {
    console.log('🚗 Inzahlungnahme E-Mail Anfrage');
    console.log('Body:', req.body);
    console.log('Files:', req.files);

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
• Mobile.de Link: https://home.mobile.de/GM-TOP-CARS#des_${carId}

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

📎 ANGEHÄNGTE DATEIEN:
• Fahrzeugbilder: ${req.files?.vehicleImages?.length || 0} Datei(en)
• Fahrzeugdokumente: ${req.files?.vehicleDocuments?.length || 0} Datei(en)
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

    // Priprema attachment-a
    const attachments = [];
    
    if (req.files?.vehicleImages) {
      req.files.vehicleImages.forEach((file, index) => {
        attachments.push({
          filename: `vozilo_slika_${index + 1}_${file.originalname}`,
          content: file.buffer,
          contentType: file.mimetype
        });
      });
    }
    
    if (req.files?.vehicleDocuments) {
      req.files.vehicleDocuments.forEach((file, index) => {
        attachments.push({
          filename: `vozilo_dokument_${index + 1}_${file.originalname}`,
          content: file.buffer,
          contentType: file.mimetype
        });
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_RECIPITENT,
      to: process.env.EMAIL_RECIPITENT,
      subject: `🔄 Inzahlungnahme Anfrage - ${tradeInBrand} ${tradeInModel} (${name})`,
      text: emailContent,
      attachments: attachments
    };

    await transporter.sendMail(mailOptions);
    
    console.log('✅ Inzahlungnahme E-Mail erfolgreich gesendet');
    res.status(200).json({ 
      success: true,
      message: 'Inzahlungnahme Anfrage erfolgreich gesendet!',
      attachmentsCount: attachments.length
    });

  } catch (error) {
    console.error('❌ Fehler beim Senden der Inzahlungnahme E-Mail:', error);
    res.status(500).json({ 
      error: 'Fehler beim Senden der Anfrage.',
      details: error.message 
    });
  }
};