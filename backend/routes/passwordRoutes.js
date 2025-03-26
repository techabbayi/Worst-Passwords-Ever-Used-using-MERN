const express = require('express');
const Password = require('../models/passwordSchema');
const { body, validationResult } = require('express-validator');
const cors = require('cors');  // CORS middleware
const router = express.Router();


// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 1. CREATE a weak password (POST)
router.post(
  '/',
  [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
      .matches(/\d/)
      .withMessage('Password must contain at least one number.'),
    body('username').optional().isString().withMessage('Username must be a string'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { password, username = 'Anonymous' } = req.body;

    try {
      const newPassword = new Password({ password, username });
      await newPassword.save();
      res.status(201).json({ message: 'Password added successfully', password: newPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding password', error: error.message });
    }
  }
);

// 2. GET all passwords (GET)
router.get('/', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching passwords', error: error.message });
  }
});

// 3. GET a password by ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const password = await Password.findById(id);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }
    res.status(200).json(password);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching password', error: error.message });
  }
});

// 4. UPDATE a weak password by ID (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { password, username } = req.body;

  try {
    const updatedPassword = await Password.findByIdAndUpdate(id, { password, username }, { new: true });

    if (!updatedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }

    res.status(200).json({ message: 'Password updated successfully', updatedPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
});



// 5. DELETE a weak password by ID (DELETE)
router.delete('/:id', async (req, res) => { 
  const { id } = req.params;

  try {
    const deletedPassword = await Password.findByIdAndDelete(id);

    if (!deletedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }

    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting password', error: error.message });
  }
});

// 6. GET a random password (GET)
router.get('/random', async (req, res) => {
  try {
    const count = await Password.countDocuments();

    if (count === 0) {
      return res.status(404).json({ message: 'No passwords found in the database' });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomPassword = await Password.findOne().skip(randomIndex);

    if (!randomPassword) {
      return res.status(404).json({ message: 'No random password found' });
    }

    res.status(200).json({ randomPassword: randomPassword.password });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching random password', error: error.message });
  }
});

module.exports = router;
