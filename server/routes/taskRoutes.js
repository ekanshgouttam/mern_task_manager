const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

// Get all tasks / Create a task
router.route('/').get(protect, getTasks).post(protect, createTask);

// Get, update, delete a specific task by ID
router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
