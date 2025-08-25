import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TaskDetail from "./TaskDetail";
import TaskForm from "../components/TaskForm";

const UserTasks = ({ token, user, onBack, isAdmin = false }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/tasks/user/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token, user.id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  if (selectedTask) {
    return (
      <TaskDetail
        token={token}
        task={selectedTask}
        onBack={() => setSelectedTask(null)}
        isAdmin={isAdmin}
      />
    );
  }

  if (showForm) {
    return (
      <TaskForm
        token={token}
        userId={user.id}
        task={editingTask}
        isAdmin={isAdmin}
        onBack={() => {
          setShowForm(false);
          setEditingTask(null);
        }}
        onSuccess={() => {
          setShowForm(false);
          setEditingTask(null);
          fetchTasks();
        }}
      />
    );
  }

  return (
    <div>
      <h2>Tareas de {user.name}</h2>
      <button onClick={onBack}>Volver a usuarios</button>
      {isAdmin && <button onClick={() => setShowForm(true)}>Crear tarea</button>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} - {t.status}
            <button onClick={() => setSelectedTask(t)}>Ver / Comentar</button>
            {isAdmin && (
              <>
                <button onClick={() => handleEdit(t)}>Editar</button>
                <button
                  onClick={async () => {
                    if (window.confirm("Eliminar esta tarea?")) {
                      try {
                        await axios.delete(
                          `http://localhost:4000/api/tasks/${t.id}`,
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        fetchTasks();
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}
                >
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;