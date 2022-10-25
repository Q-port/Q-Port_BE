const { Router } = require('express');
const router = Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.post('/', loginController.login);

module.exports = router;
