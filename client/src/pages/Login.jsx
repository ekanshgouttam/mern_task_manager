import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const { data } = await loginUser({ email, password });

      const payload = {
        token: data.token,
        user: {
          _id: data._id,
          name: data.name,
          email: data.email,
        },
      };

      localStorage.setItem("user", JSON.stringify(payload));
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
            Sign In
          </button>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-400 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

