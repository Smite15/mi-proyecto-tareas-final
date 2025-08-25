const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Task = require("./Task");
const User = require("./User");

const Comment = sequelize.define("Comment", {
  content: { type: DataTypes.TEXT, allowNull: false }
});

// Relación 1:N Task -> Comment
Task.hasMany(Comment, { foreignKey: "taskId" });
Comment.belongsTo(Task, { foreignKey: "taskId" });

// Relación 1:N User -> Comment
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

module.exports = Comment;