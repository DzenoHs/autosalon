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

// Konfiguracija SMTP transporta
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendTradeInEmail = async (req, res) => {
  try {
    console.log('📨 TRADE-IN REQUEST RECEIVED:');
    console.log('📋 Request Body:', JSON.stringify(req.body, null, 2));
    console.log('📎 Files received:', {
      vehicleImages: req.files?.vehicleImages?.length || 0,
      vehicleDocuments: req.files?.vehicleDocuments?.length || 0
    });
    
    if (req.files?.vehicleImages) {
      console.log('🖼️ Vehicle Images Details:');
      req.files.vehicleImages.forEach((file, index) => {
        console.log(`  Image ${index + 1}: ${file.originalname} (${file.size} bytes, ${file.mimetype})`);
      });
    }
    
    if (req.files?.vehicleDocuments) {
      console.log('📄 Vehicle Documents Details:');
      req.files.vehicleDocuments.forEach((file, index) => {
        console.log(`  Document ${index + 1}: ${file.originalname} (${file.size} bytes, ${file.mimetype})`);
      });
    }

    const {
      name, email, phone, message,
      carId, carMake, carModel, carPrice,
      tradeInBrand, tradeInModel, tradeInYear, tradeInMileage,
      tradeInFuel, tradeInCondition, tradeInVIN, tradeInRegistration,
      gender
    } = req.body;

    // Dobijanje upload-ovanih fajlova
    const vehicleImages = req.files?.vehicleImages || [];
    const vehicleDocuments = req.files?.vehicleDocuments || [];

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

📞 NACHRICHT:
${message || 'Keine Nachricht'}

🚗 INTERESSIERTES FAHRZEUG:
• Fahrzeug-ID: ${carId || 'Nicht angegeben'}
• Marke: ${carMake || 'Nicht angegeben'}
• Modell: ${carModel || 'Nicht angegeben'}
• Preis: ${carPrice ? `€${carPrice.toLocaleString('de-DE')}` : 'Nicht angegeben'}
• Link: https://www.autohausmiftari.com/car/${carId}

═══════════════════════════════════════

🔄 INZAHLUNGNAHME FAHRZEUG:
• Marke: ${tradeInBrand}
• Modell: ${tradeInModel}
• Baujahr: ${tradeInYear || 'Nicht angegeben'}
• Kilometerstand: ${tradeInMileage ? `${tradeInMileage.toLocaleString('de-DE')} km` : 'Nicht angegeben'}
• Kraftstoff: ${tradeInFuel || 'Nicht angegeben'}
• Zustand: ${tradeInCondition || 'Nicht angegeben'}
• Fahrgestellnummer: ${tradeInVIN || 'Nicht angegeben'}
• Erstzulassung: ${tradeInRegistration || 'Nicht angegeben'}

═══════════════════════════════════════

📎 ANHÄNGE:
• Fahrzeugbilder: ${vehicleImages.length} Dateien
• Fahrzeugdokumente: ${vehicleDocuments.length} Dateien

═══════════════════════════════════════

⚡ AutoHaus Miftari
📧 Diese Anfrage wurde über das Kontaktformular gesendet.
    `;

    // Priprema email attachments
    const attachments = [];
    
    // Dodavanje slika vozila
    vehicleImages.forEach((file, index) => {
      attachments.push({
        filename: `vozilo_slika_${index + 1}_${file.originalname}`,
        content: file.buffer,
        contentType: file.mimetype
      });
    });
    
    // Dodavanje dokumenata vozila
    vehicleDocuments.forEach((file, index) => {
      attachments.push({
        filename: `vozilo_dokument_${index + 1}_${file.originalname}`,
        content: file.buffer,
        contentType: file.mimetype
      });
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPITENT,
      subject: `🔄 Inzahlungnahme Anfrage - ${tradeInBrand} ${tradeInModel} (${name})`,
      text: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    console.log('📤 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      attachmentsCount: mailOptions.attachments?.length || 0
    });

    const emailResult = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', {
      messageId: emailResult.messageId,
      response: emailResult.response
    });
    
    res.status(200).json({ 
      success: true,
      message: 'Inzahlungnahme Anfrage erfolgreich gesendet!',
      emailId: emailResult.messageId
    });

  } catch (error) {
    console.error('❌ Fehler beim Senden der Inzahlungnahme E-Mail:', error);
    res.status(500).json({ 
      error: 'Fehler beim Senden der Anfrage.',
      details: error.message 
    });
  }
};