const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable is not set');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Employee Notes API is running');
});

app.use('/api/notes', noteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: process.env.NODE_ENV === 'production' ? {} : err.message });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connection established');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
