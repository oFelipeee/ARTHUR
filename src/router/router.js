const { Router } = require("express");
const UserController = require("../controller/UserController");
const userRouter = require("./routerUser");
const authenticateToken = require('../middlewares/authenticateToken');
const uploadRoutes = require('./routerUpload');
const { uploadImage } = require("../controller/UploadController");
const { validateUser, validateUserId } = require("../middlewares/ValidateUser");

const router = Router();

router.use('/image', uploadRoutes);

router.use('/user', userRouter);

router.post('/login', (req, res) => {
    UserController.login(req, res)
});

module.exports = router;