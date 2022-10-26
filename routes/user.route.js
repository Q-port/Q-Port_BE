const { Router } = require('express');
const router = Router();
const auth = require('../middlewares/authMiddlewares')

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const Upload = require('../middlewares/postImageUploadMiddleware')
const upload = new Upload()

router.put('/users/image', auth, upload.upload.single('avatar'), userController.updateImg);
router.get('/users', auth, userController.getUser);
router.get('/users/:userId', userController.getOther);
router.put('/users/:userId', auth, userController.updateUser);


module.exports = router;
