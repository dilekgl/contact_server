const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "mail.anchmarmarine.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@anchmarmarine.com",
      pass: "Anchmar!2001+-/", // Şifreni buraya yaz
    },
  });

  const mailOptions = {
    from: email,
    to: "info@anchmarmarine.com",
    subject: `İletişim Formu: ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mail başarıyla gönderildi" });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Mail gönderilemedi" });
  }
});

app.listen(3001, () => {
  console.log("Backend 3001 portunda çalışıyor");
});
