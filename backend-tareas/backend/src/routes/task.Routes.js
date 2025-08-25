const router = require("express").Router();
const upload = require("../middlewares/upload");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  getAllTasks,
  getTasksByUser // 🔹 Importar la función correcta
} = require("../controllers/task.Controller");

// Rutas protegidas

// Usuario ve sus propias tareas
router.get("/", verifyToken, getTasks);

// Admin ve todas las tareas
router.get("/all", verifyToken, isAdmin, getAllTasks);

// Crear tarea (usuario o admin)
router.post("/", verifyToken, upload.single("file"), createTask);

// Editar tarea
router.put("/:id", verifyToken, upload.single("file"), updateTask);

// Eliminar tarea
router.delete("/:id", verifyToken, deleteTask);

// Admin ve tareas de un usuario específico
router.get("/user/:userId", verifyToken, isAdmin, getTasksByUser);

module.exports = router;
