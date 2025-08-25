const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Task = require("./Task");

const Notification = sequelize.define("Notification", {
  message: { type: DataTypes.STRING, allowNull: false }
});

// Relación 1:N Task -> Notification
Task.hasMany(Notification, { foreignKey: "taskId" });
Notification.belongsTo(Task, { foreignKey: "taskId" });

module.exports = Notification;