const express = require('express');
const router = express.Router();

// const Upload = require('../middlewares/postImageUploadMiddleware');
// const upload = new Upload();
const Auth = require('../middlewares/authMiddlewares');
const Upload = require('../middlewares/postImageUploadMiddleware');
const AnswersController = require('../controllers/answers.controller');
const upload = new Upload();
const answersController = new AnswersController();

// 답변글 생성 /api/answers/:questionId
// 답변글 조회 /api/answers/:questionId
router
  .route('/:questionId')
  .post(Auth, answersController.createAnswer)
  .get(answersController.getAnswer);

//  답변에 이미지 등록 /api/answers/:answerId/image
router.put(
  '/:answerId/image',
  Auth,
  upload.upload.single('answerImg'),
  answersController.updateImage
);

// 답변글 수정 /api/answers/:answerId
// 답변글 삭제 /api/answers/:answerId
router
  .route('/:answerId')
  .put(Auth, answersController.updateAnswer)
  .delete(Auth, answersController.deleteAnswer);

//  해당 userId의 답변글 목록 받기 /api/answers/users/:userId
router.get('/users/:userId', Auth, answersController.findByUserId);

module.exports = router;
