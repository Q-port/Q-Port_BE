const QuestionsRepository = require('../repositories/questions.repository');

class QuestionsService {
  questionsRepository = new QuestionsRepository();

  createQna = async (req, res, next) => {
    try {
      //   const { user } = res.locals;
      const { title, content, imgUrl, score } = req.body;

      // 가지고 있는 내공이 10 이하이면 글작성 실패
      //   if (user.score <= 10) throw new Error('최소 내공이 부족합니다.');

      /**
       * 이쯤에서 이미지 파일 저장하는 과정 들어가야 할듯
       * 아니면 미들웨어 ?
       */
      const qna = {
        userId: 1,
        title,
        content,
        imgUrl,
        score,
        done: false,
      };

      await this.questionsRepository.createQna(qna);

      res.status(200);
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
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

  deleteQna = async (req, res, next) => {};
}

module.exports = QuestionsService;
