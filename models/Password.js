const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
}, { timestamps: true });

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
