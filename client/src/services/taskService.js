import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

export const getTasks = async () => {
  const token = getToken();
  return await axios.get(`${API_BASE_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTaskById = async (id) => {
  const token = getToken();
  return await axios.get(`${API_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (id, updatedTaskData) => {
  const token = getToken();
  return await axios.put(`${API_BASE_URL}/api/tasks/${id}`, updatedTaskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = async (id) => {
  const token = getToken();
  return await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = async (taskData) => {
  const token = getToken();
  return await axios.post(`${API_BASE_URL}/api/tasks`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
