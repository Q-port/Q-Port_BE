const joi = require('../util/joi');
const AnswersService = require('../services/answers.service');

class AnswersController {
  answersService = new AnswersService();

  // 답변 작성
  createAnswer = async (req, res, next) => {
    try {
      await joi.AnswerWriteSchema.validateAsync(req.body);

      await this.answersService.createAnswer(req, res);

      res.status(200).send({ ok: true, message: '답변 작성 완료' });
    } catch (error) {
      next(error);
    }
  };

  // 답변 불러오기
  getAnswer = async (req, res, next) => {
    try {
      const answer = await this.answersService.getAnswer(req, res);
      res.status(200).send({ ok: true, data: answer });
    } catch (error) {
      next(error);
    }
  };

  // 답변 수정
  updateAnswer = async (req, res, next) => {
    try {
      await joi.AnswerWriteSchema.validateAsync(req.body);

      await this.answersService.updateAnswer(req, res);

      res.status(200).send({ ok: true, message: '답변이 수정되었습니다.' });
    } catch (error) {
      next(error);
    }
  };

  // 답변 삭제
  deleteAnswer = async (req, res, next) => {
    try {
      await this.answersService.deleteAnswer(req, res);

      res.status(200).send({ ok: true, message: '답변이 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  };

  // 이미지 업데이트
  updateImage = async (req, res, next) => {
    try {
      await this.answersService.updateImage(req, res);

      res.status(200).send({ ok: true, message: '이미지가 등록되었습니다.' });
    } catch (error) {
      next(error);
    }
  };

  // 내가 작성한 답변글 목록 받기
  findByUserId = async (req, res, next) => {
    try {
      const answers = await this.answersService.findByUserId(req, res);

      res.status(200).send({ data: answers });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AnswersController;
