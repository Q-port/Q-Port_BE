const { Question, User } = require('../models');

class QuestionsRepository {
  constructor() {
    this.Question = Question;
    this.User = User;
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

  updateQna = async (questionId, title, content) => {
    await this.Question.update(
      { title, content, updatedAt: Date.now() },
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

  selectQna = async (/**answerUserId,  */ questionId, answerId) => {
    await this.Question.update(
      { selectedAnswer: answerId },
      { where: { questionId } }
    );
    // await this.User.increment(
    //   { score: 1 },
    //   { where: { userId: answerUserId } }
    // );
  };

  updateImage = async (questionId, imgUrl) => {
    try {
      await this.Question.update(
        {
          imgUrl,
        },
        {
          where: { questionId },
        }
      );

      return await this.findByQna(questionId);
    } catch (error) {
      throw new Error(`UnhandleMysqlSequelizeError: ${error}`);
    }
  };
}

module.exports = QuestionsRepository;
