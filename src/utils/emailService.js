const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendConfirmationEmail = async (email, language = 'en', confirmUrl) => {
  const subject = language === 'es' 
    ? 'Confirma tu suscripción al boletín'
    : 'Confirm your newsletter subscription';

  const htmlContent = language === 'es'
    ? `
      <h2>¡Gracias por suscribirte!</h2>
      <p>Por favor, confirma tu correo electrónico haciendo clic en el enlace a continuación:</p>
      <a href="${confirmUrl}" style="background-color: #2b6cb0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Confirmar suscripción</a>
      <p>O copia y pega este enlace en tu navegador:</p>
      <p>${confirmUrl}</p>
    `
    : `
      <h2>Thank you for subscribing!</h2>
      <p>Please confirm your email address by clicking the link below:</p>
      <a href="${confirmUrl}" style="background-color: #2b6cb0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Confirm subscription</a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${confirmUrl}</p>
    `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: htmlContent
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send confirmation email');
  }
};

module.exports = {
  sendConfirmationEmail
};