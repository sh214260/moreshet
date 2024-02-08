
const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., Gmail, Yahoo, etc.
//  type: 'SMTP', host: 'smtp.gmail.com',
  auth: {
    user: 'sh214260@gmail.com',
    pass: '214260796',
  },
});

// Function to send the email
const sendEmail = (name, email, phone, message) => {
  const mailOptions = {
    from: 'sh214260@gmail.com',
    to: 'sh214260@gmail.com',
    subject: 'New contact form submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
