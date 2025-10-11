import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { uploadBufferToFirebase } from '../utils/uploadToFirebase.js'; // Make sure this util exists

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

const generateNewFileName = (originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return `${uniqueSuffix}${ext}`;
};

export const sendTradeInEmail = async (req, res) => {
  try {
    console.log('📨 TRADE-IN REQUEST RECEIVED:');
    console.log('📋 Request Body:', JSON.stringify(req.body, null, 2));
    console.log('📎 Files received:', {
      vehicleImages: req.files?.vehicleImages?.length || 0,
      vehicleDocuments: req.files?.vehicleDocuments?.length || 0
    });

    const {
      name, email, phone, message,
      carId, carMake, carModel, carPrice,
      tradeInBrand, tradeInModel, tradeInYear, tradeInMileage,
      tradeInFuel, tradeInCondition, tradeInVIN, tradeInRegistration,
      gender
    } = req.body;

    const vehicleImages = req.files?.vehicleImages || [];
    const vehicleDocuments = req.files?.vehicleDocuments || [];

    if (!name || !email || !tradeInBrand || !tradeInModel) {
      return res.status(400).json({ error: 'Erforderliche Daten fehlen.' });
    }

    // 🔼 Upload images & documents to Firebase
    const uploadedImages = await Promise.all(
      vehicleImages.map(file => {
        const newName = generateNewFileName(file.originalname);
        return uploadBufferToFirebase(
          file.buffer,
          `tradeins/images/${newName}`,
          file.mimetype
        )
      }

      )
    );

    const uploadedDocs = await Promise.all(
      vehicleDocuments.map(file => {
        const newName = generateNewFileName(file.originalname);
        return uploadBufferToFirebase(
          file.buffer,
          `tradeins/docs/${newName}`,
          file.mimetype
        )
      }

      )
    );

    console.log('✅ Uploaded to Firebase:', {
      images: uploadedImages.length,
      docs: uploadedDocs.length
    });

    // 🔹 Create email content including links
    let attachmentsSection = '';
    if (uploadedImages.length) attachmentsSection += '🖼️ Fahrzeugbilder:\n' + uploadedImages.join('\n') + '\n';
    if (uploadedDocs.length) attachmentsSection += '📄 Fahrzeugdokumente:\n' + uploadedDocs.join('\n') + '\n';

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
• Fahrzeugbilder: ${uploadedImages.length} Dateien
• Fahrzeugdokumente: ${uploadedDocs.length} Dateien

${attachmentsSection}

═══════════════════════════════════════

⚡ AutoHaus Miftari
📧 Diese Anfrage wurde über das Kontaktformular gesendet.
`;
    const emailContentHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background: #f9f9f9;
      padding: 20px;
    }
    .container {
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      max-width: 700px;
      margin: auto;
    }
    h2 {
      color: #8c1d1d;
    }
    h3 {
      margin-top: 25px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    p {
      margin: 5px 0;
    }
    .label {
      font-weight: bold;
    }
    .block {
      background: #f4f4f4;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      white-space: pre-wrap;
      margin-top: 10px;
    }
    a {
      color: #0073e6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔄 Neue Inzahlungnahme Anfrage</h2>

    <h3>👤 Kundendaten</h3>
    <p><span class="label">Anrede:</span> ${gender || 'Nicht angegeben'}</p>
    <p><span class="label">Name:</span> ${name}</p>
    <p><span class="label">E-Mail:</span> <a href="mailto:${email}">${email}</a></p>
    <p><span class="label">Telefon:</span> ${phone || 'Nicht angegeben'}</p>

    <h3>📞 Nachricht</h3>
    <p>${message || 'Keine Nachricht'}</p>

    <h3>🚗 Interessiertes Fahrzeug</h3>
    <p><span class="label">Fahrzeug-ID:</span> ${carId || 'Nicht angegeben'}</p>
    <p><span class="label">Marke:</span> ${carMake || 'Nicht angegeben'}</p>
    <p><span class="label">Modell:</span> ${carModel || 'Nicht angegeben'}</p>
    <p><span class="label">Preis:</span> ${carPrice ? `€${carPrice.toLocaleString('de-DE')}` : 'Nicht angegeben'}</p>
    <p><span class="label">Link:</span> <a href="https://www.autohausmiftari.com/car/${carId}">Fahrzeug ansehen</a></p>

    <h3>🔄 Inzahlungnahme Fahrzeug</h3>
    <p><span class="label">Marke:</span> ${tradeInBrand}</p>
    <p><span class="label">Modell:</span> ${tradeInModel}</p>
    <p><span class="label">Baujahr:</span> ${tradeInYear || 'Nicht angegeben'}</p>
    <p><span class="label">Kilometerstand:</span> ${tradeInMileage ? `${tradeInMileage.toLocaleString('de-DE')} km` : 'Nicht angegeben'}</p>
    <p><span class="label">Kraftstoff:</span> ${tradeInFuel || 'Nicht angegeben'}</p>
    <p><span class="label">Zustand:</span> ${tradeInCondition || 'Nicht angegeben'}</p>
    <p><span class="label">Fahrgestellnummer:</span> ${tradeInVIN || 'Nicht angegeben'}</p>
    <p><span class="label">Erstzulassung:</span> ${tradeInRegistration || 'Nicht angegeben'}</p>

    <h3>📎 Anhänge</h3>
    <p><span class="label">Fahrzeugbilder:</span> ${uploadedImages.length} Dateien</p>
    <p><span class="label">Fahrzeugdokumente:</span> ${uploadedDocs.length} Dateien</p>

    ${uploadedImages.length
        ? `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px; margin-top: 15px;">
      ${uploadedImages
          .map(
            (url) =>
              `<img src="${url}" alt="Fahrzeugbild" style="width: 100%; max-height: 120px; object-fit: cover; border-radius: 6px;" />`
          )
          .join('')}
    </div>
    `
        : ''
      }
${uploadedImages.length
        ? `
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px; margin-top: 15px;">
  ${uploadedImages
          .map(
            (url) =>
              `<a href="${url}" target="_blank" rel="noopener noreferrer">
          <img src="${url}" alt="Fahrzeugbild" style="width: 100%; max-height: 120px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd;" />
        </a>`
          )
          .join('')}
</div>
`
        : ''
      }

    <p style="margin-top: 30px; font-size: 14px; color: #666;">
      ⚡ <strong>AutoHaus Miftari</strong><br />
      📧 Diese Anfrage wurde über das Kontaktformular gesendet.
    </p>
  </div>
</body>
</html>
`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPITENT,
      subject: `🔄 Inzahlungnahme Anfrage - ${tradeInBrand} ${tradeInModel} (${name})`,
      text: emailContent,
      html: emailContentHtml,
    };

    console.log('📤 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      attachmentsCount: uploadedImages.length + uploadedDocs.length
    });

    const emailResult = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', {
      messageId: emailResult.messageId,
      response: emailResult.response
    });

    res.status(200).json({
      success: true,
      message: 'Inzahlungnahme Anfrage erfolgreich gesendet!',
      emailId: emailResult.messageId,
      uploadedImages,
      uploadedDocs
    });

  } catch (error) {
    console.error('❌ Fehler beim Senden der Inzahlungnahme E-Mail:', error);
    res.status(500).json({
      error: 'Fehler beim Senden der Anfrage.',
      details: error.message
    });
  }
};
