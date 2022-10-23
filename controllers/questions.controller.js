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

      res.status(200).send({ ok: true, message: '게시글이 수정되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

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

  updateImage = async (req, res, next) => {
    try {
      const { questionId } = req.params;
      // const { userId } = res.locals.user;
      const userId = 1;
      const imageFileName = req.file ? req.file.key : null;
      const imageData = await this.questionsService.updateImage(
        userId,
        questionId,
        imageFileName
      );
      res.status(200).json({ image: imageData });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = QuestionsController;
