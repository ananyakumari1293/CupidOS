const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

  roomId: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  time: {
    type: String
  },

  reaction: {
    type: String
  }

}, {

  timestamps: true

});

module.exports =
  mongoose.model(
    "Message",
    messageSchema
  );