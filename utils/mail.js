const nodemailer = require('nodemailer');
require("dotenv").config();

const Mailer = ({ text, to, subject }) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'srmedias121@gmail.com',
        pass: 'hwtc khra ylmm gcnx',
      },
    });

    const mailOptions = {
      from: "subhashvarmakolanada@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        reject(false); // Email sending failed
      } else {
        console.log('Email sent:', info.response);
        resolve(true); // Email sent successfully
      }
    });
  });
};

module.exports = Mailer;
