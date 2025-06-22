const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// CORS Configuration
const allowedOrigins = ["https://mern-task-manager-1-1m3r.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


const userRoutes = require('./routes/userRoutes'); // Import user routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes (if exist)

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // You can comment this out if `taskRoutes` doesn’t exist yet

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>{
      console.log(`Server running on port ${process.env.PORT}`)
   } );
  })
  .catch((err) =>
    console.error('MongoDB connection error:', err)
  );

