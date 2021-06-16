const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    ennum: ['User', 'Admin', 'Tech'],
    default: 'User',
  },
  enabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('user', userSchema);
