import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const TaskDetail = ({ token, task, onBack, isAdmin = false }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/comments/task/${task.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
    }
  }, [token, task.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `http://localhost:4000/api/comments`,
        { content: newComment, taskId: task.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("¿Eliminar este comentario?")) return;
    try {
      await axios.delete(
        `http://localhost:4000/api/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar comentario");
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Fecha vencimiento: {task.dueDate}</p>
      <p>Estado: {task.status}</p>

      {task.file && (
        <p>
          Archivo:{" "}
          <a href={`http://localhost:4000/uploads/${task.file}`} target="_blank" rel="noreferrer">
            {task.file}
          </a>
        </p>
      )}

      <h4>Comentarios</h4>
      {comments.length === 0 ? (
        <p>No hay comentarios.</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              {c.content}{" "}
              {isAdmin && (
                <button onClick={() => handleDeleteComment(c.id)}>Eliminar</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <textarea
        placeholder="Agregar comentario"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Agregar comentario</button>
      <button onClick={onBack}>Volver</button>
    </div>
  );
};

export default TaskDetail;