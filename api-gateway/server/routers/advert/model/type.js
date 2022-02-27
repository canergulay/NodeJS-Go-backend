const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    names:{
        type:Object,
    },
    type:{
        type:Number
    },
    isSingle:{
        type:Boolean
    },
    explains:{
        type:Object,
    },
},{timestamps:true})



const Category = mongoose.model('Category',categorySchema)

module.exports = Category