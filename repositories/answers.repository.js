const { Question, Answer, User } = require('../models');

class AnswersRepository {
  constructor() {}

  // 답변 작성
  createAnswer = async (answer) => {
    await Answer.create({
      ...answer,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  // QuestionId로 답변 모두 불러오기
  findByQuestionId = async (questionId) => {
    return await Answer.findAll({
      where: { questionId },
    });
  };

  // AnswerId로 답변 불러오기
  findByAnswerId = async (answerId) => {
    return await Answer.findOne({
      where: { answerId },
    });
  };

  // userId로 답변글 불러오기
  findByUserId = async (userId) => {
    return await Answer.findAll({
      attributes: ['questionId', 'createdAt', 'answerId'],
      where: { userId },
    });
  };

  // 답변 중복확인
  findByDuplicate = async (questionId, userId) => {
    return await Answer.findOne({
      where: { questionId, userId },
    });
  };

  // 답변 수정
  updateAnswer = async (answerId, content, imgUrl) => {
    await Answer.update(
      { content, imgUrl, updatedAt: Date.now() },
      { where: { answerId } }
    );
  };

  // 답변 삭제
  deleteAnswer = async (answerId) => {
    await Answer.destroy({
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
    return await Answer.count({
      where: { questionId: questionId },
    });
  };

  // 질문 글 상태 확인용 question 불러오기
  getQuestionByQuestionId = async (questionId) => {
    return await Question.findOne({
      attributes: ['questionId', 'title', 'selectedAnswer'],
      where: { questionId },
    });
  };
}

module.exports = AnswersRepository;
