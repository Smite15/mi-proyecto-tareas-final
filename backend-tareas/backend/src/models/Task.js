const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("pendiente", "en progreso", "completada"), defaultValue: "pendiente" },
  dueDate: { type: DataTypes.DATEONLY },
  file: { type: DataTypes.STRING }
});

// Relación 1:N User -> Task
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = Task;