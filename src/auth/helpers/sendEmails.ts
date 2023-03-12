/* eslint-disable prettier/prettier */
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';

export const sendEmail = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombres, email } = datos;

  const source = `
  <!DOCTYPE html>
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Bienvenido a Social Wires</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .logo {
        width: 150px;
        margin: 0 auto;
        display: block;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
      }

      p {
        margin-bottom: 20px;
      }

      .cta-button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: #008cba;
        color: #fff;
        text-decoration: none;
        text-align: center;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://via.placeholder.com/150x50.png?text=Social+Wires" alt="Logo de Social Wires" class="logo" />
      <h1>Bienvenido a Social Wires</h1>
      <p>Su cuenta ha sido creada correctamente. ¡Gracias por registrarse!</p>
      <p>Puede acceder a su cuenta en cualquier momento a través de nuestra página web:</p>
      <a href="https://www.socialwires.com" class="cta-button">Ir a Social Wires</a>
    </div>
  </body>
</html>

  
  `;

  const htmlToSend = handlebars.compile(source)({ nombres });

  // Enviar el correo electrónico
  await transport.sendMail({
    from: '"Social Wires" <info@socialwires.com>',
    to: email,
    subject: 'Creación de cuenta (SocialWires)',
    text: 'Creación de cuenta (SocialWires)',
    html: htmlToSend,
  });
};
