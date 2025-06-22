const User = require('../models/user'); // ✅ correct path to your model
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  console.log('➡️ Hit the registerUser route');
  const { name, email, password } = req.body;
  console.log('📦 Received:', name, email);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('❌ Error in registerUser:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User

const loginUser = async (req, res) => {
  console.log('➡️ Hit the loginUser route');
  const { email, password } = req.body;
  console.log('📦 Received:', email, password);

  try {
    const user = await User.findOne({ email });
    console.log('👤 Fetched user from DB:', user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('🔐 Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('❌ Error in loginUser:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  registerUser,
  loginUser
};

