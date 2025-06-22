import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getTasks = async (token) => {
  return await axios.get(`${API_BASE_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (token, taskData) => {
  return await axios.post(`${API_BASE_URL}/api/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (token, taskId, updates) => {
  return await axios.put(`${API_BASE_URL}/api/tasks/${taskId}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (token, taskId) => {
  return await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTaskById = async (id, token) => {
  const res = await axios.get(`${API_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


};

