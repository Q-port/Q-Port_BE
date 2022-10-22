const QuestionsService = require('../services/questions.service');

class QuestionsController {
  questionsService = new QuestionsService();

  createQna = async (req, res, next) => {
    try {
      await this.questionsService.createQna(req, res);

      res.status(200).send({ ok: true, message: '질문 작성 완료' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

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

  findByQna = async (req, res, next) => {
    try {
      const detail = await this.questionsService.findByQna(req, res);

      res.status(200).send({ ok: true, data: detail });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  updateQna = async (req, res, next) => {
    try {
      await this.questionsService.updateQna(req, res);

      res.status(200).send({ ok: true, meeage: '게시글이 수정되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  deleteQna = async (req, res, next) => {};
}

module.exports = QuestionsController;
