const { Question } = require('../models');

class QuestionsRepository {
  constructor() {
    this.Question = Question;
  }

  createQna = async (qna) => {
    await this.Question.create({
      ...qna,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  getQna = async () => {
    return await this.Question.findAll({
      attributes: {
        exclude: ['content'],
      },
      order: [['createdAt', 'desc']],
    });
  };

  findByQna = async (questionId) => {
    return await this.Question.findOne({
      where: {
        questionId,
      },
    });
  };

  updateQna = async (questionId, title, content, imgUrl) => {
    await this.Question.update(
      { title, content, imgUrl, updatedAt: Date.now() },
      { where: { questionId } }
    );
  };

  deleteQna = async (questionId) => {
    await this.Question.destroy({
      where: {
        questionId,
      },
    });
  };

  selectQna = async (questionId, answerId) => {
    await this.Question.update(
      { selectedAnswer: answerId },
      { where: { questionId } }
    );
  };
}

module.exports = QuestionsRepository;
