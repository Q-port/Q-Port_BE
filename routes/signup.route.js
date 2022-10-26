const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authLoginUserMiddleware');

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

router.post('/signup', auth, signupController.signup);

module.exports = router;
