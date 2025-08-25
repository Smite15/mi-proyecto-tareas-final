import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTasks from "./UserTasks";

const AdminDashboard = ({ token, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [token]);

  if (selectedUser) {
    return (
      <UserTasks
        token={token}
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
        isAdmin={true}
      />
    );
  }

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <button onClick={onLogout}>Cerrar sesión</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.role})
            <button onClick={() => setSelectedUser(u)}>Ver tareas</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;