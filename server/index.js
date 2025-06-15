const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes'); // <-- import your route file here
const taskRoutes = require('./routes/taskRoutes'); // if you have task routes too

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parses incoming JSON

//  Mount your routes here (AFTER middleware, BEFORE connecting to DB)
app.use('/api/users', userRoutes); 
app.use('/api/tasks', taskRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));

