const express = require('express');
const Password = require('./models/Password');
const router = express.Router();

// 1. CREATE a weak password (POST)
router.post('/passwords', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password is too weak!' });
    }

    const newPassword = new Password({ password });
    await newPassword.save();

    res.status(201).json({ message: 'Password added successfully', password: newPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error adding password', error });
  }
});

// 2. READ all weak passwords (GET)
router.get('/passwords', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching passwords', error });
  }
});

// 3. READ a random weak password (GET)
router.get('/passwords/random', async (req, res) => {
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
      res.status(500).json({ message: 'Error fetching random password', error });
    }
  });
  
// 4. UPDATE a weak password by ID (PUT)
router.put('/passwords/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const updatedPassword = await Password.findByIdAndUpdate(id, { password }, { new: true });

    if (!updatedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }

    res.status(200).json({ message: 'Password updated successfully', updatedPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error });
  }
});

// 5. DELETE a weak password by ID (DELETE)
router.delete('/passwords/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPassword = await Password.findByIdAndDelete(id);

    if (!deletedPassword) {
      return res.status(404).json({ message: 'Password not found' });
    }

    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting password', error });
  }
});

module.exports = router;
