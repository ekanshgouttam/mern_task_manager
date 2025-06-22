import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getTasks = async (token) => {
  return await axios.get(`${API_BASE_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTaskById = async (id, token) => {
  return await axios.get(`${API_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (id, updatedTaskData, token) => {
  return await axios.put(`${API_BASE_URL}/api/tasks/${id}`, updatedTaskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = async (id, token) => {
  return await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = async (taskData, token) => {
  return await axios.post(`${API_BASE_URL}/api/tasks`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


