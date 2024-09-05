const { Router } = require("express");
const UserController = require("../controller/UserController");
const authenticateToken = require('../middlewares/authenticateToken');
const uploadRoutes = require('./routerUpload');

const router = Router();


router.user('/image', uploadRoutes);

router.use('/user', userRoutes);

router.post('/login', (req, res) => {
    UserController.login(req, res)
});

module.exports = router;