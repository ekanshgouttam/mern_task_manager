const Task = require('../models/task');

const mongoose = require('mongoose');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private

const deleteTask = async (req, res) => {
  try {
    console.log('➡️ Task ID param:', req.params.id);
    console.log('🧑‍🦱 User from token:', req.user.id);

    // Just to debug - show what's in DB
    const allTasks = await Task.find();
    console.log('🧾 All Tasks in DB:', allTasks);

    const task = await Task.findOne({
      _id: req.params.id,
      user: new mongoose.Types.ObjectId(req.user.id),
      });
    
    if (!task) {
      console.log('❌ Task not found with matching ID and user');
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    console.log('✅ Task deleted:', task._id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('❗Server error:', err.message);
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};


