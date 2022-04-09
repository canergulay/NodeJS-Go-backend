const jwt_manager = require("../../../utils/jwt_manager");

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    picture: {
      type: String,
      default: "avatar.jpg",
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    rmethod: {
      type: Number,
      required: true,
    },
    fcm:{
      type:String,
    },
    tokens: [String],
  },
  { timestamps: true }
)

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt_manager.generateToken({ id: user._id }, "30d");
  user.tokens = user.tokens.concat(token);
  return (await user.save()).clearify();
}

userSchema.methods.clearify = function () {
  const user = this;
  return {
    _id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    picture: user.picture,
    tokens: user.tokens,
  }
}

userSchema.methods.getPurifiedUserInfo = () => {
  const user = this;
  return JSON.stringify(user, ["id", "username", "email", "phone", "picture"]);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
