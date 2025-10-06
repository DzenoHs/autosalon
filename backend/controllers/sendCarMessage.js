import nodemailer from 'nodemailer';
import multer from 'multer';

// Setup multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
  fileFilter: (req, file, cb) => {
    // Allow images and documents
    const allowedMimes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsuported file type'), false);
    }
  }
});

export const sendCarMessageEmail = [
  upload.array('attachments', 20), // Max 20 files
  async (req, res) => {
    try {
      const { name, email, message, carId } = req.body;
      const files = req.files || [];

      console.log('📧 CarMessage Email:', { name, email, carId, filesCount: files.length });
      
      // Debug: ispišimo informacije o fajlovima
      if (files && files.length > 0) {
        files.forEach((file, index) => {
          console.log(`📎 File ${index + 1}:`, {
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            bufferLength: file.buffer ? file.buffer.length : 'NO BUFFER'
          });
        });
      } else {
        console.log('⚠️ No files received!');
      }

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, Email und Nachricht sind erforderlich.' });
      }

      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // Prepare attachments from uploaded files
      const attachments = files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
      }));

      console.log('📎 Pripremam attachments:', attachments.length, 'fajlova');
      attachments.forEach((att, index) => {
        console.log(`  - ${index + 1}: ${att.filename} (${att.contentType}) - ${att.content ? att.content.length : 0} bytes`);
      });

      const mailOptions = {
        from: process.env.EMAIL_RECIPITENT,
        to: process.env.EMAIL_RECIPITENT,
        subject: `🔄 CarMessage Anfrage - ${name}`,
        text: message,
        attachments: attachments
      };

      console.log('📧 Šaljem email sa', attachments.length, 'attachments...');

      await transporter.sendMail(mailOptions);
      
      console.log('✅ CarMessage Email sent successfully with', files.length, 'attachments');
      res.status(200).json({ 
        message: 'CarMessage Email erfolgreich gesendet.',
        success: true,
        attachmentsCount: files.length
      });
      
    } catch (error) {
      console.error('❌ CarMessage Email error:', error);
      res.status(500).json({ 
        error: 'Fehler beim Senden der CarMessage Email.',
        details: error.message
      });
    }
  }
];