const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create and export the user model
module.exports = mongoose.model('User', userSchema);