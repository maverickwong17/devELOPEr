const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    messageText: {
      type: String,
      required: true,
      trimmed: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
