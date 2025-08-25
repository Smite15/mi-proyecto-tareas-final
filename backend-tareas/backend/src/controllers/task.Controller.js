const Task = require("../models/Task");
const Notification = require("../models/Notification");
const User = require("../models/User");

// Crear tarea
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, userId } = req.body;
    const file = req.file ? req.file.filename : null;

    const task = await Task.create({ title, description, dueDate, status, userId, file });

    await Notification.create({ message: `Tarea "${title}" creada`, taskId: task.id });

    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener tareas del usuario logueado
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ 
      where: { userId: req.user.id }, 
      include: [User, Notification] 
    });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener todas las tareas (admin)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: [User, Notification] });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar tarea
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status, userId } = req.body;
    const file = req.file ? req.file.filename : null;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update({ title, description, dueDate, status, userId, file });

    await Notification.create({ message: `Tarea "${title}" actualizada`, taskId: task.id });

    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar tarea
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener tareas de un usuario específico (admin)
const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.findAll({
      where: { userId },
      include: [User, Notification]
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Exportar todas las funciones juntas
module.exports = { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  getAllTasks, 
  getTasksByUser 
};
