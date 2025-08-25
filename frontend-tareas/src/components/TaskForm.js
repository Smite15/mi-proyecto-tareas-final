import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ token, userId, onBack, onSuccess, task = null, isAdmin = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setStatus(task.status || "pendiente");
    } else {
      // Limpiar campos si es nueva tarea
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("pendiente");
      setFile(null);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("dueDate", dueDate);
      formData.append("status", status);
      formData.append("userId", userId);
      if (file) formData.append("file", file);

      if (task) {
        // Editar tarea
        await axios.put(
          `http://localhost:4000/api/tasks/${task.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Crear tarea
        await axios.post(
          `http://localhost:4000/api/tasks`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      onSuccess();
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Error al guardar la tarea");
    }
  };

  return (
    <div>
      <h2>{task ? "Editar Tarea" : "Crear Tarea"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          readOnly={!isAdmin}
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          readOnly={!isAdmin}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          disabled={!isAdmin}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={!isAdmin}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={!isAdmin}
        />
        <button type="submit">{task ? "Guardar cambios" : "Crear"}</button>
        <button type="button" onClick={onBack}>Cancelar</button>
      </form>
    </div>
  );
};

export default TaskForm;