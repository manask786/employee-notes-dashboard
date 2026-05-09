const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Validate MONGO_URI is set
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
