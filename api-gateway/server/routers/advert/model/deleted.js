const mongoose = require('mongoose')

const deletedSchema = mongoose.Schema({
    deleter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    target:{
        type:mongoose.Schema.Types.Mixed
    }
},{timestamps:true})



const Deleted = mongoose.model('Deleted',deletedSchema)

module.exports = Deleted