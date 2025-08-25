const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registrar usuario
const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Verificar si ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ message: "Logged in", token, role: user.role, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

module.exports = { register, login };