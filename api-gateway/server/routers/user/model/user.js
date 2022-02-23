const jwt_manager = require('../../../helpers/jwt_manager');

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique: true 
    },
    phone:{
      type: String,
      required:true,
      unique: true 
    },
    password:{
        type: String,
        required:true, 
    },
    rmethod:{
      type: Number,
      required:true 
    },
    tokens:[String]
},{timestamps:true})





userSchema.methods.generateToken = async function(){
  const user = this
  const token = jwt_manager.generateToken({id:user._id},'30d')
  user.tokens = user.tokens.concat(token)
  return await user.save()
}





const User = mongoose.model('User',userSchema)

module.exports = User