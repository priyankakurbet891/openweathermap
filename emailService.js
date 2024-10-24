// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any email service you prefer
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const sendAlertEmail = (city, temp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ALERT_EMAIL, // Email to send alerts
    subject: `Weather Alert for ${city}`,
    text: `Alert: ${city} temperature exceeded threshold! Current Temp = ${temp}°C`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Alert email sent:', info.response);
  });
};

module.exports = { sendAlertEmail };
