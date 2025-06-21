import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/login`, userData);
  const payload = {
    token: response.data.token,
    user: {
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
    },
  };
  localStorage.setItem("user", JSON.stringify(payload));
  return payload;
};

