const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, surname, number, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name} ${surname}" <${process.env.MAIL_USER}>`,
      to: "info@anchmarmarine.com",
      replyTo: email,
      subject: "İletişim Formu Mesajı",
      html: `
        <p><strong>Ad Soyad:</strong> ${name} ${surname}</p>
        <p><strong>Telefon:</strong> ${number}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong><br>${message}</p>
      `,
    });

    res.status(200).json({ message: "Mesaj başarıyla gönderildi!" });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    res.status(500).json({ message: "Gönderim sırasında hata oluştu." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
