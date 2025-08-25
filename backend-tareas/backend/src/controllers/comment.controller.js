const Comment = require("../models/Comment");

// Obtener comentarios por tarea
const getCommentsByTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const comments = await Comment.findAll({ where: { taskId } });
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener comentarios", error: err.message });
  }
};

// Crear comentario
const createComment = async (req, res) => {
  const { content, taskId } = req.body;
  try {
    const comment = await Comment.create({
      content,
      taskId,
      userId: req.user.id, // Asegúrate que venga del token
    });
    res.status(201).json({ comment });
  } catch (err) {
    res.status(500).json({ message: "Error al crear comentario", error: err.message });
  }
};

// Eliminar comentario
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.destroy({ where: { id } });
    res.json({ message: "Comentario eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar comentario", error: err.message });
  }
};

module.exports = { getCommentsByTask, createComment, deleteComment };