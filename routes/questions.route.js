const express = require('express');
const router = express.Router();

const QuestionsController = require('../controllers/questions.controller');
const questionsController = new QuestionsController();
const Upload = require('../middlewares/postImageUploadMiddleware');
const upload = new Upload();

router
  .route('/')
  .post(questionsController.createQna)
  .get(questionsController.getQna);
router
  .route('/:questionId/image')
  .put(upload.upload.single('postImage'), questionsController.updateImage);
router
  .route('/:questionId')
  .get(questionsController.findByQna)
  .put(questionsController.updateQna)
  .delete(questionsController.deleteQna);

router.route('/:questionId/:answerId').put(questionsController.selectQna);

module.exports = router;
