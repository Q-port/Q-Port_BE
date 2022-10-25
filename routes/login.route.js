const { Router } = require('express');
const router = Router();
const existlogin = require('../middlewares/authLoginUserMiddleware')

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.post('/login',existlogin, loginController.login);

module.exports = router;
