import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../services/taskService";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", status: "pending", dueDate: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await getTaskById(id, token);
        setTask(data);
        setForm({
          title: data.title,
          description: data.description || "",
          status: data.status || "pending",
          dueDate: data.dueDate ? data.dueDate.substring(0, 10) : "",
        });
      } catch (err) {
        setError("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      const { data } = await updateTask(id, form, token);
      setTask(data);
      setEditMode(false);
    } catch (err) {
      setError("Failed to update task");
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="bg-gray-800 p-6 rounded shadow-md">
        {editMode ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 rounded"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 rounded"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 rounded"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 rounded"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
            <p className="mb-2">{task.description}</p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span> {task.status}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Due Date:</span>{" "}
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "None"}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Edit Task
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
