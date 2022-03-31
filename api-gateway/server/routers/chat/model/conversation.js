const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    users:[{
        type: String,
        ref: 'User'
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }
},{timestamps:true})



const Conversation = mongoose.model('Conversation',conversationSchema)

module.exports = Conversation