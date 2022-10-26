const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');

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
  .post(auth, upload.upload.single('qnaImage'), questionsController.createQna)
  .get(questionsController.getQna);

/**
 * GET : 질문글 검색
 */
router.route('/search').get(questionsController.qnaSearch);

/**
 * GET : 질문글 상세 조회
 * PUT : 질문글 제목, 내용 수정
 * DELETE : 질문글 삭제
 */
router
  .route('/:questionId')
  .get(questionsController.findByQna)
  .put(auth, upload.upload.single('qnaImage'), questionsController.updateQna)
  .delete(auth, questionsController.deleteQna);

/**
 * PUT : 질문자 채택
 */
router.route('/:questionId/:answerId').put(auth, questionsController.selectQna);

/**
 * GET : 내가 작성한 질문글 보기
 */
router.route('/users/:userId').get(questionsController.myQuestions);

module.exports = router;
