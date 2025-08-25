require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

// Rutas
const authRoutes = require("./routes/auth.Routes");
const taskRoutes = require("./routes/task.routes");
const commentRoutes = require("./routes/comment.routes");
const notificationRoutes = require("./routes/notification.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// Sincronizar DB y arrancar servidor
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ DB conectada y sincronizada");

    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`API corriendo en puerto ${port}`));
  } catch (err) {
    console.error("❌ Error al iniciar:", err.message);
  }
};

start();
