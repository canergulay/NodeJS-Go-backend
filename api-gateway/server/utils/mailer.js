var nodemailer = require('nodemailer');

require('dotenv').config()

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD
  }
});

const mailOptions =function (mail,code) {
 return {
    from:  process.env.MAIL,
    to:  mail,
    subject: 'CITYCAST AUTHENTICATION MAIL',
    text: "code is :"+ code
 }
};

function sendmail(mail,code){
    console.log(mail,code)
   return transporter.sendMail(mailOptions(mail,code))
}

module.exports = sendmail