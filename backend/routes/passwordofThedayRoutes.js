const express = require('express');
const PasswordOfTheDay = require('../models/passwordOfDaySchema');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/password-of-the-day',
  [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
      .matches(/\d/)
      .withMessage('Password must contain at least one number.'),
    body('username')
      .optional()
      .isString()
      .withMessage('Username must be a valid string'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { password, username = 'Anonymous' } = req.body;

    try {
      await PasswordOfTheDay.updateMany({ passwordOfTheDay: true }, { $set: { passwordOfTheDay: false } });

      const newPasswordOfTheDay = new PasswordOfTheDay({ password, username, passwordOfTheDay: true });
      await newPasswordOfTheDay.save();

      res.status(201).json({
        message: 'Password of the Day set successfully',
        password: newPasswordOfTheDay,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error setting password of the day', error: error.message });
    }
  }
);

router.get('/password-of-the-day', async (req, res) => {
  try {
    const passwordOfTheDay = await PasswordOfTheDay.findOne({ passwordOfTheDay: true })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!passwordOfTheDay) {
      return res.status(404).json({ message: 'No password of the day set' });
    }

    res.status(200).json({
      passwordOfTheDay: passwordOfTheDay.password,
      username: passwordOfTheDay.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching password of the day', error: error.message });
  }
});

router.put(
  '/password-of-the-day',
  [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
      .matches(/\d/)
      .withMessage('Password must contain at least one number.'),
    body('username')
      .optional()
      .isString()
      .withMessage('Username must be a valid string'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { password, username = 'Anonymous' } = req.body;

    try {
      const updatedPasswordOfTheDay = await PasswordOfTheDay.findOneAndUpdate(
        { passwordOfTheDay: true },
        { password, username },
        { new: true }
      );

      if (!updatedPasswordOfTheDay) {
        return res.status(404).json({ message: 'Password of the day not found to update' });
      }

      res.status(200).json({
        message: 'Password of the Day updated successfully',
        password: updatedPasswordOfTheDay,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating password of the day', error: error.message });
    }
  }
);

module.exports = router;
