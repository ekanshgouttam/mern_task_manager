import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-black transition-colors duration-500">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        
        {/* Left Side Image */}
        <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/assets/login-illustration.png')" }}>
          {/* If the image doesn't load, add /public/assets/login-illustration.png in your project */}
          <div className="w-full h-full backdrop-brightness-75"></div>
        </div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10 text-white"
        >
          <h2 className="text-3xl font-bold mb-8">Welcome Back 👋</h2>

          {/* Social login */}
          <button
            className="w-full flex items-center justify-center gap-3 border border-white/30 py-3 rounded-xl mb-6 hover:bg-white/10 transition"
            onClick={() => alert("Google login coming soon")}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <div className="border-b border-white/20 my-6"></div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-white/80">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring focus:ring-indigo-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-white/80">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring focus:ring-indigo-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-colors duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-sm text-white/60 text-center">
            Don’t have an account? <span className="underline cursor-pointer hover:text-white">Sign up</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

