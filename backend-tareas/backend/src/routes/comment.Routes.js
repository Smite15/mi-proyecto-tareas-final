const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/auth"); 
const commentController = require("../controllers/comment.Controller");

// Obtener comentarios por tarea (user y admin)
router.get("/task/:taskId", verifyToken, commentController.getCommentsByTask);

// Crear comentario (user y admin)
router.post("/", verifyToken, commentController.createComment);

// Eliminar comentario (solo admin)
router.delete("/:id", verifyToken, isAdmin, commentController.deleteComment);

module.exports = router;