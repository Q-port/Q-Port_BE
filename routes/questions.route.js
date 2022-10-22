const express = require('express');
const router = express.Router();

const QuestionsController = require('../controllers/questions.controller');
const questionsController = new QuestionsController();

router
  .route('/')
  .post(questionsController.createQna)
  .get(questionsController.getQna);

router
  .route('/:questionId')
  .get(questionsController.findByQna)
  .put(questionsController.updateQna)
  .delete(questionsController.deleteQna);

router
.route('/:questionId/:answerId')
.put(questionsController.selectQna);

module.exports = router;
