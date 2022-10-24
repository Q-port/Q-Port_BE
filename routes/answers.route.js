const express = require('express');
const router = express.Router();

// const Upload = require('../middlewares/postImageUploadMiddleware');
// const upload = new Upload();
const AnswersController = require('../controllers/answers.controller');
const answersController = new AnswersController();

// 답변글 생성 /api/answers/:questionId
// 답변글 조회 /api/answers/:questionId
router
  .route('/:questionId')
  .post(answersController.createAnswer)
  .get(answersController.getAnswer);

// 답변글 수정 /api/answers/:answerId
// 답변글 삭제 /api/answers/:answerId
router
  .route('/:answerId')
  .put(answersController.updateAnswer)
  .delete(answersController.deleteAnswer);

//  답변에 이미지 등록
router.route('/:answerId/image');

module.exports = router;
