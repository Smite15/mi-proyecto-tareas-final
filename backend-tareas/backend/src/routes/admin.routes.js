const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/auth");
const { getUsers } = require("../controllers/admin.controller");

router.get("/users", verifyToken, isAdmin, getUsers);

module.exports = router;