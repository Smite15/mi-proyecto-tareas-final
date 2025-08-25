-- Script de base de datos para el sistema de gestión de tareas

-- Elimina tablas si existen (para reinicios rápidos)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Tabla usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);

-- Tabla tareas
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pendiente', -- pendiente en proceso | completado
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla comentarios
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Usuario administrador por defecto
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@demo.com', '123456', 'admin');

--Usuarios que se creo para la prueba, usando postman, PgAdmin4
"name": "Saul Mite",
"email": "saul@example.com",
"password": "123456"
"role": "user"

  "name": "Administrador",
  "email": "admin@ms.com",
  "password": "admin123",
  "role": "admin";

