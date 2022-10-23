const { update } = require('immutable');
const QuestionsRepository = require('../repositories/questions.repository');
require('dotenv').config();

class QuestionsService {
  questionsRepository = new QuestionsRepository();

  createQna = async (req, res, next) => {
    // const { userId } = res.locals.user;
    const userId = 1;
    const { title, content } = req.body;
    const num = (Math.ceil(Math.random() * 12) + '').padStart(2, '0');
    const qna = {
      userId,
      title,
      content,
      imgUrl: `http://spartacodingclub.shop/static/images/rtans/SpartaIcon${num}.png`,
    };

    await this.questionsRepository.createQna(qna);

    res.status(200);
  };

  getQna = async (req, res, next) => {
    return await this.questionsRepository.getQna();
  };

  findByQna = async (req, res, next) => {
    const { questionId } = req.params;
    const detail = await this.questionsRepository.findByQna(questionId);
    if (!questionId || !detail) throw new Error('잘못된 요청 입니다.');

    return detail;
  };

  updateQna = async (req, res, next) => {
    const { questionId } = req.params;
    const { title, content } = req.body;
    // const { userId } = res.locals.user;
    const userId = 1;
    const findByWriter = await this.questionsRepository.findByQna(questionId);

    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    await this.questionsRepository.updateQna(questionId, title, content);
  };

  deleteQna = async (req, res, next) => {
    // const { userId } = res.locals.user;
    const userId = 1;
    const { questionId } = req.params;
    const findByWriter = await this.questionsRepository.findByQna(questionId);

    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    await this.questionsRepository.deleteQna(questionId);
  };

  selectQna = async (req, res, next) => {
    const { questionId, answerId } = req.params;
    // const { userId } = res.locals.user;
    const userId = 1;

    const findByWriter = await this.questionsRepository.findByQna(questionId);

    if (!findByWriter) throw new Error('잘못된 요청입니다.');
    if (findByWriter.userId !== userId)
      throw new Error('본인만 채택할 수 있습니다.');

    // await this.questionsRepository.findByAnswerUser(answerId);
    // const answerUserId = findByAnswerUserId.userId;
    await this.questionsRepository.selectQna(
      // answerUserId,
      questionId,
      answerId
    );
  };

  updateImage = async (userId, questionId, imageFileName) => {
    if (!imageFileName) throw new Error('게시물 이미지가 빈 값');
    const findByWriter = await this.questionsRepository.findByQna(questionId);

    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    const updateImageData = await this.questionsRepository.updateImage(
      questionId,
      process.env.S3_STORAGE_URL + imageFileName
    );

    return updateImageData;
  };
}

module.exports = QuestionsService;
