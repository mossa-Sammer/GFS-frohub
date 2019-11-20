const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
});

module.exports = mongoose.model('users', usersSchema);
