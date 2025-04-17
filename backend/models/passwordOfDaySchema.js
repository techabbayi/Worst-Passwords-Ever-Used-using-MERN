const mongoose = require('mongoose');

const passwordOfTheDaySchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    username: {
      type: String,
      required: false,
      default: 'Anonymous',
    },
    passwordOfTheDay: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const PasswordOfTheDay = mongoose.model('PasswordOfTheDay', passwordOfTheDaySchema);

module.exports = PasswordOfTheDay;