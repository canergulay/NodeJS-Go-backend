const mongoose = require('mongoose')

const verificationSchema = mongoose.Schema({
    mail:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
    }
},{timestamps:true})



const Verification = mongoose.model('Verification',verificationSchema)

module.exports = Verification