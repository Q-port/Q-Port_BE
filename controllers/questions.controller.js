const QuestionsService = require('../services/questions.service');
const joi = require('../util/joi');

class QuestionsController {
  questionsService = new QuestionsService();

  // 작성여부에 따른 status를 클라이언트로 전달
  createQna = async (req, res, next) => {
    try {
      // body로 받아오는 title, content 검증
      await joi.questionSchema.validateAsync(req.body);

      await this.questionsService.createQna(req, res);

      res.status(200).send({ ok: true, message: '질문 작성 완료' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // return된 질문글 목록을 전달
  getQna = async (req, res, next) => {
    try {
      const qna = await this.questionsService.getQna();
      res.status(200).send({ ok: true, data: qna });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // return된 질문글 상세조회 데이터를 전달
  findByQna = async (req, res, next) => {
    try {
      await this.questionsService.qnaViewCheck(req);
      const detail = await this.questionsService.findByQna(req, res);

      res.status(200).send({ ok: true, data: detail });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 수정 성공 여부에 따른 status를 전달
  updateQna = async (req, res, next) => {
    try {
      // body로 받아오는 title, content 검증
      await joi.questionSchema.validateAsync(req.body);

      await this.questionsService.updateQna(req, res);

      res.status(200).send({ ok: true, message: '게시글이 수정되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 삭제 성공 여부에 따른 status를 전달
  deleteQna = async (req, res, next) => {
    try {
      await this.questionsService.deleteQna(req, res);

      res.status(200).send({ ok: true, message: '게시글이 삭제되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 채택 성공 여부에 따른 status를 전달
  selectQna = async (req, res, next) => {
    try {
      await this.questionsService.selectQna(req, res);
      res.status(200).send({ ok: true, message: '채택되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 이미지 업로드 결과에 따라 status를 전달
  updateImage = async (req, res, next) => {
    try {
      const { questionId } = req.params;
      // const { userId } = res.locals.user;
      const userId = 1;

      // 미들웨어를 통해 받은 file이 존재하지 않으면 null로 전달
      const imageFileName = req.file ? req.file.key : null;
      const imageData = await this.questionsService.updateImage(
        userId,
        questionId,
        imageFileName
      );
      res.status(200).send({ ok: true, data: imageData });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = QuestionsController;
