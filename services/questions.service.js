const QuestionsRepository = require('../repositories/questions.repository');

class QuestionsService {
  questionsRepository = new QuestionsRepository();

  createQna = async (req, res, next) => {
    //   const { user } = res.locals;
    const { title, content, imgUrl } = req.body;

    const qna = {
      // userId: user.userId,
      // nickname: user.nickname,
      userId: 1,
      title,
      content,
      imgUrl,
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
    const { title, content, imgUrl } = req.body;
    // const {user}=res.locals
    const findByWriter = await this.questionsRepository.findByQna(questionId);

    // if (findByWriter.questionId !== questionId)
    //   throw new Error('본인만 수정할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    await this.questionsRepository.updateQna(
      questionId,
      title,
      content,
      imgUrl
    );
  };

  deleteQna = async (req, res, next) => {
    const { questionId } = req.params;
    const findByWriter = await this.questionsRepository.findByQna(questionId);

    // if (findByWriter.questionId !== questionId)
    //   throw new Error('본인만 수정할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    await this.questionsRepository.deleteQna(questionId);
  };

  selectQna = async (req, res, next) => {
    const { questionId, answerId } = req.params;
    // const {user}=res.locals
    const findByWriter = await this.questionsRepository.findByQna(questionId);

    // if (findByWriter.questionId !== questionId)
    //   throw new Error('본인만 채택할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    await this.questionsRepository.selectQna(questionId, answerId);
  };
}

module.exports = QuestionsService;
