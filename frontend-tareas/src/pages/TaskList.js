import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TaskDetail from "./TaskDetail";
import TaskForm from "../components/TaskForm";

const TaskList = ({ token, userId, role, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (selectedTask) {
    return (
      <TaskDetail
        token={token}
        task={selectedTask}
        userId={userId}
        onBack={() => setSelectedTask(null)}
        isAdmin={role === "admin"}
      />
    );
  }

  if (showForm) {
    return (
      <TaskForm
        token={token}
        userId={userId}
        task={null}
        isAdmin={role === "admin"}
        onBack={() => setShowForm(false)}
        onSuccess={() => {
          setShowForm(false);
          fetchTasks();
        }}
      />
    );
  }

  return (
    <div>
      <h2>Mis Tareas</h2>
      <button onClick={onLogout}>Cerrar sesión</button>

      {/* Solo mostrar botón crear si es admin */}
      {role === "admin" && (
        <button
          onClick={() => setShowForm(true)}
          style={{ marginLeft: "10px" }}
        >
          Crear tarea
        </button>
      )}

      {tasks.length === 0 ? (
        <p>No hay tareas.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id} style={{ margin: "10px 0" }}>
              <b>{t.title}</b> - {t.status}
              <button
                onClick={() => setSelectedTask(t)}
                style={{ marginLeft: "10px" }}
              >
                Ver / Comentar
              </button>

              {/* Solo admin puede editar tareas aquí */}
              {role === "admin" && (
                <button
                  onClick={() => {
                    setSelectedTask(t);
                    setShowForm(true);
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  Editar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;