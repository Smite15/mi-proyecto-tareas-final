const router = require("express").Router();
const { getNotifications } = require("../controllers/notification.controller");

router.get("/", getNotifications);

module.exports = router;