const { Question } = require('../models');

class QuestionsRepository {
  constructor() {
    this.Question = Question;
  }

  createQna = async (qna) => {
    await this.Question.create(qna);
  };

  getQna = async (req, res, next) => {
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
      { title, content, imgUrl },
      { where: { questionId } }
    );
  };

  deleteQna = async (req, res, next) => {};
}

module.exports = QuestionsRepository;
