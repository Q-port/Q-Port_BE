const express = require('express');
const router = express.Router();

const QuestionsController = require('../controllers/questions.controller');
const questionsController = new QuestionsController();

/**
 * 이미지 파일 업로드 미들웨어
 */
const Upload = require('../middlewares/postImageUploadMiddleware');
const upload = new Upload();

/**
 * POST : 질문글 게시
 * GET : 질문글 목록 조회
 */
router
  .route('/')
  .post(questionsController.createQna)
  .get(questionsController.getQna);

  /**
   * PUT : 질문글 이미지 업로드 API
   */
router
  .route('/:questionId/image')
  .put(upload.upload.single('postImage'), questionsController.updateImage);

  /**
   * GET : 질문글 상세 조회
   * PUT : 질문글 제목, 내용 수정
   * DELETE : 질문글 삭제
   */
router
  .route('/:questionId')
  .get(questionsController.findByQna)
  .put(questionsController.updateQna)
  .delete(questionsController.deleteQna);

router.route('/:questionId/:answerId').put(questionsController.selectQna);

module.exports = router;
