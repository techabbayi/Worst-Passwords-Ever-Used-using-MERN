const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passwordRoutes = require('./routes/passwordRoutes');
const passwordOfTheDayRoutes = require('./routes/passwordofThedayRoutes');

const app = express();
const PORT = 8000;

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err);
});

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.get('/', (req, res) => {
  res.status(200).send('This is Worst Passwords Ever Used, ASAP Project!, MongoDB Connection Successful');
});


app.get('/ping', (req, res) => {
  res.status(200).send('Hey, This is Lokeswara Reddy');
});


app.use('/passwords', passwordRoutes);
app.use('/ofTheDay', passwordOfTheDayRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
