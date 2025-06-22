import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored?.token || !stored?.user) {
      navigate("/login");
      return;
    }
    setUser(stored.user);

    const fetchData = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks:", err.message);
      }
    };
    fetchData();
  }, [navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTask(newTask);
      setTasks([...tasks, data]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error("Failed to add task:", err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdate = async () => {
    try {
      const { data } = await updateTask(editingTaskId, {
        title: editTitle,
        description: editDescription,
      });
      setTasks(tasks.map((t) => (t._id === editingTaskId ? data : t)));
      setEditingTaskId(null);
      setEditTitle("");
      setEditDescription("");
    } catch (err) {
      console.error("Failed to update task:", err.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-semibold">Please log in to view your dashboard.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-6">
        {user?.name ? `Welcome, ${user.name} 👋` : "Welcome!"}
      </h1>

      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <form
        onSubmit={handleAddTask}
        className="mb-6 bg-gray-800 p-4 rounded shadow-md flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
          required
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold">
          Add Task
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <li key={task._id} className="bg-gray-800 p-4 rounded shadow-md">
              {editingTaskId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-1 rounded text-black"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-1 rounded text-black mt-2"
                  />
                  <div className="mt-2 flex gap-3">
                    <button onClick={handleUpdate} className="bg-green-600 px-4 py-1 rounded">
                      Save
                    </button>
                    <button onClick={() => setEditingTaskId(null)} className="bg-gray-500 px-4 py-1 rounded">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="mt-2 flex gap-3">
                    <button onClick={() => navigate(`/tasks/${task._id}`)} className="bg-yellow-600 px-4 py-1 rounded">
                      View
                    </button>
                    <button onClick={() => handleEditClick(task)} className="bg-blue-600 px-4 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="bg-red-600 px-4 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
