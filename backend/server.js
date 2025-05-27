const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const passwordOfTheDayRoutes = require('./routes/passwordofThedayRoutes');
const entityRoutes = require('./routes/sqlEntities');
const { authenticateDatabase } = require('./sqlConfig/mysql');

require('./models/sqlAssociations');



dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// SQL Connection
authenticateDatabase();



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/ofTheDay', passwordOfTheDayRoutes);
app.use("/api", entityRoutes);



// Health check routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Worst Passwords Ever Used, API is running' });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
