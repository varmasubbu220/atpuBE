const nodemailer = require('nodemailer');
require("dotenv").config();

const Mailer = ( text, to, subject ) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'srmedias121@gmail.com',
        pass: 'hwtc khra ylmm gcnx',
      },
    });

    const mailOptions = {
      from: 'srmedias121@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        reject(false); 
      } else {
        console.log('Email sent:', info.response);
        resolve(true);
      }
    });
  });
};

module.exports = Mailer;
