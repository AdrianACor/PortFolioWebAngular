const express = require('express');
// const nodemailer = require('nodemailer');
const {Resend} = require("resend");
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/envio', async (req, res) => {
  const { name, emailFrom, message } = req.body;

  try {
      const email = await enviarCorreo(name,emailFrom, message);
      res.status(200).json({ message: 'Correo enviado con éxito', data: email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al enviar el correo', error: error.message });
    }

//   const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port:587,
//         secure:false,
//         auth:{
//             user:'adrian.cordovamoreno@gmail.com',
//             pass:'hfgu lcri xpig efcr'
//         },
//         tls:{
//             rejectUnauthorized: false
//         }
//   });

//   const mailOptions = {
//     from: email,
//     to: 'adrian.cordovamoreno@gmail.com',
//     subject: `Mensaje de ${name}`,
//     text: message
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Correo enviado');
//   } catch (error) {
//     console.log('Error: ',error)
//     res.status(500).send('Error al enviar el correo');
//   }
});

async function enviarCorreo(name,emailFrom, message) {
  try {
    const email = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: "vacio_05@yahoo.com.mx",
      subject: `Mensaje de ${name} <${emailFrom}>`,
      html: message,
    });
    return email; // Devuelve el objeto de respuesta
  } catch (error) {
    console.error(error);
    throw error; // Re-lanzar el error para que Angular lo maneje
  }
}

module.exports = app;
// app.listen(5000, () => console.log('Servidor corriendo en el puerto 5000'));