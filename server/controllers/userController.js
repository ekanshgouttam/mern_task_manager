const User = require('../models/user');


const registerUser = async (req, res) => {

 console.log("➡️ Hit the registerUser route");

  const { name, email, password } = req.body;
  console.log("📦 Received:", name, email);

  try {
    const userExists = await User.findOne({ email });
    console.log("🔍 userExists:", userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    console.log("✅ User created:", user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  // logic to log in user
};

module.exports = {
  registerUser,
  loginUser,
};



