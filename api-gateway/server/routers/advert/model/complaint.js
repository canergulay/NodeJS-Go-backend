const mongoose = require('mongoose')

const complaintSchema = mongoose.Schema({
    complainant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        required:true,
    },
    target:{
        type:mongoose.Schema.Types.Mixed
    }
},{timestamps:true})



const Complaint = mongoose.model('Complaint',complaintSchema)

module.exports = Complaint