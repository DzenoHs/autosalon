import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  console.log('📧 Email zahtev:', { name, email, message: message ? message.substring(0, 100) + '...' : 'No message' })

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Alle Felder sind erforderlich.' });
  }

  try {
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
      subject: 'Neue Kontaktformular-Nachricht',
      text: `
Name: ${name}
E-Mail: ${email}
Nachricht:
${message}
  `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};

