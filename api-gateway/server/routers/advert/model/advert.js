const mongoose = require('mongoose')

const advertSchema = mongoose.Schema({
    type:{
        type:Number
    },
    category: {
        type:mongoose.Schema.Types.ObjectId
    },
    genderMixType:{
        type:Number
    },
    numberOfMan:{
        type:Number
    },
    numberOfWoman:{
        type:Number
    },
    advertTitle:{
        type:String
    },
    advertAbout:{
        type:String
    },
    advertOther:{
        type:String
    },
    location:{
        id:{
            type:Number,
        },
        firstName:{
            type:String,
        },
        upperName:{
            type:String,
        },
        lat:{
            type:String
        },
        lon:{
            type:String
        },
        coordinates:[{type:Number}]
    },
    pointPinned:{
       
    },
    rent:{
        type:Number
    },
    currency:{
        type:String
    },
    deposit:{
        type:Number
    },
    dateSoonest:{
        type:Date
    },
    isShort:{
        type:Boolean
    },
    isLong:{
        type:Boolean
    },
    pictures:[{type:String}]
},{timestamps:true})



const Advert = mongoose.model('Advert',advertSchema)

module.exports = Advert