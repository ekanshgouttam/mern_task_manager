import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../services/taskService";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored?.token) {
      navigate("/login");
      return;
    }

    const fetchTask = async () => {
      try {
        const data = await getTaskById(id, stored.token);
        setTask(data);
      } catch (err) {
        setError("Failed to load task details");
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (error) return <p className="text-red-500">{error}</p>;

  if (!task) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <p className="mt-2">{task.description}</p>
      </div>
      <button onClick={() => navigate("/dashboard")} className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded">
        Back to Dashboard
      </button>
    </div>
  );
};

export default TaskDetails;

