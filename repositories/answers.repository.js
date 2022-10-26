const { Question, Answer, User } = require('../models');

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

  // userId로 답변글 불러오기
  findByUserId = async (userId) => {
    return await this.Answer.findAll({
      where: { userId },
    });
  };

  // 답변 중복확인
  findByDuplicate = async (questionId, userId) => {
    return await this.Answer.findOne({
      where: { questionId, userId },
    });
  };

  // 답변 수정
  updateAnswer = async (answerId, content, imgUrl) => {
    await this.Answer.update(
      { content, imgUrl, updatedAt: Date.now() },
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

  // 대상 질문글에 답변 갯수 증가
  addAnswerCount = async (questionId) => {
    await Question.increment({ answerCount: 1 }, { where: questionId });
  };
  // 대상 질문글에 답변 갯수 감소
  subtractAnswerCount = async (questionId) => {
    await Question.increment({ answerCount: -1 }, { where: questionId });
  };

  // questionId에 따른 답변 갯수 카운트
  answerCountByQuestionId = async (questionId) => {
    return await Answer.count({ where: { questionId: questionId } });
  };

  // 이미지 업로드
  updateImage = async (answerId, imgUrl) => {
    try {
      await this.Answer.update(
        {
          imgUrl,
        },
        {
          where: { answerId },
        }
      );
    } catch (error) {
      throw new Error(`UnhandleMysqlSequelizeError: ${error}`);
    }
  };
}

module.exports = AnswersRepository;
