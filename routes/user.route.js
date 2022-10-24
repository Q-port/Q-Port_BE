const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();


router.post('/users', userController.getUser);
router.put('/users', userController.updateUser);

module.exports = router;
