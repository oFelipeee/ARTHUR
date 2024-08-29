const {Router} = require("express");
const UserController = require("../controller/UserController");
const { validateUser, validateUserId } = require("../middlewares/ValidateUser");

const router = Router();

module.exports = router;