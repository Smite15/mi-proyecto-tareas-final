const User = require("../models/User");
const Task = require("../models/Task");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
      include: {
        model: Task,
        attributes: ["id", "title", "status", "dueDate"]
      }
    });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers };