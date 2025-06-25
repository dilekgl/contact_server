require("dotenv").config(); // .env dosyasını yükle

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // 587 için STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.SMTP_USER,
    subject: `İletişim Formu: ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mail başarıyla gönderildi" });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    res.status(500).json({ message: "Mail gönderilemedi" });
  }
});

// ⬇️ Burası eksikti — Railway için çok önemli!
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend ${PORT} portunda çalışıyor`);
});
