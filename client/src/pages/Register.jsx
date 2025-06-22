import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../services/authService';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem("user", JSON.stringify({
        token: data.token,
        user: {
          _id: data._id,
          name: data.name,
          email: data.email
        }
      }));
      navigate("/");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Registration failed. Try a different email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

