const Notification = require("../models/Notification");

const getNotifications = async (_req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getNotifications };