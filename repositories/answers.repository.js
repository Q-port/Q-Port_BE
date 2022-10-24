const { Answer, User } = require('../models');

class AnswersRepository {
  constructor() {
    this.Answer = Answer;
    this.User = User;
  }

  // 답변 작성
  createAnswer = async (answer) => {
    await this.Answer.create({
      ...answer,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  // QuestionId로 답변 모두 불러오기
  findByQuestionId = async (questionId) => {
    return await this.Answer.findAll({
      where: { questionId },
    });
  };

  // AnswerId로 답변 불러오기
  findByAnswerId = async (answerId) => {
    return await this.Answer.findOne({
      where: { answerId },
    });
  };

  // 답변 중복확인
  findByDuplicate = async (questionId, userId) => {
    return await this.Answer.findOne({
      where: { questionId, userId },
    });
  };

  // 답변 수정
  updateAnswer = async (answerId, title, content) => {
    await this.Answer.update(
      { title, content, updatedAt: Date.now() },
      { where: { answerId } }
    );
  };

  // 답변 삭제
  deleteAnswer = async (answerId) => {
    await this.Answer.destroy({
      where: {
        answerId,
      },
    });
  };

  // 이미지 업로드
  updateImage = async (questionId, imgUrl) => {};
}

module.exports = AnswersRepository;
