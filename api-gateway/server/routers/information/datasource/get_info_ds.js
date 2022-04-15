const fs = require('fs');
const Contact = require('../model/contact')
const GetInfoFromLocaleJson = (docName) => {
    const content = fs.readFileSync(__dirname + docName);
    return content;
}

const ContactUs = (userid,message) =>{
    return Contact({user:userid,message}).save()
}

module.exports = {GetInfoFromLocaleJson,ContactUs}