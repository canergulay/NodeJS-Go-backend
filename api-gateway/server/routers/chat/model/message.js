const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    message: {
      type: String,
    },
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
