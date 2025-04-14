const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/envio', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'adrian.cordovamoreno@gmail.com',
            pass:'hfgu lcri xpig efcr'
        },
        tls:{
            rejectUnauthorized: false
        }
  });

  const mailOptions = {
    from: email,
    to: 'adrian.cordovamoreno@gmail.com',
    subject: `Mensaje de ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Correo enviado');
  } catch (error) {
    console.log('Error: ',error)
    res.status(500).send('Error al enviar el correo');
  }
});

module.exports = app;
// app.listen(5000, () => console.log('Servidor corriendo en el puerto 5000'));