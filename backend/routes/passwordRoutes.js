const express = require('express');
const router = express.Router();
const Password = require('../models/password');
const authenticate = require('../middleware/authenticate');
const { body, validationResult } = require('express-validator');

// Get all passwords
router.get('/', authenticate, async (req, res) => {
  try {
    const passwords = await Password.find()
      .populate('created_by', 'username')
      .sort({ createdAt: -1 });
    res.json(passwords);
  } catch (error) {
    console.error('Get passwords error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get passwords by user ID
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const passwords = await Password.find({ created_by: req.params.userId })
      .populate('created_by', 'username')
      .sort({ createdAt: -1 });
    res.json(passwords);
  } catch (error) {
    console.error('Get passwords by user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new password
router.post('/', authenticate, [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { password, site, username } = req.body;
    
    const newPassword = new Password({
      password,
      site: site || '',
      username: username || '',
      created_by: req.user._id
    });

    await newPassword.save();
    
    const populatedPassword = await Password.findById(newPassword._id)
      .populate('created_by', 'username');
      
    res.status(201).json(populatedPassword);
  } catch (error) {
    console.error('Add password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete password
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }
    
    // Check if user owns this password
    if (password.created_by.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this password' });
    }
    
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: 'Password removed' });
  } catch (error) {
    console.error('Delete password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;