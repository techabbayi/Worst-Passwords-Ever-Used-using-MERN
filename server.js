const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passwordRoutes = require('./routes');

const app = express();
const PORT = 3000;

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Basic / route
app.get('/', (req, res) => {
  res.status(200).send('This is Worst Passwords Ever Used, ASAP Project!, MongoDB Connection Successful');
});

// Basic /ping route
app.get('/ping', (req, res) => {
  res.status(200).send('Hey, This is Lokeswara Reddy');
});

// Use the password routes for handling passwords
app.use('/api', passwordRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
