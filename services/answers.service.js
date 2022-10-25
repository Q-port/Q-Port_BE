const AnswersRepository = require('../repositories/answers.repository');
const QuestionsRepository = require('../repositories/questions.repository');

class AnswersService {
  answersRepository = new AnswersRepository();
  questionsRepository = new QuestionsRepository();

  // 답변 작성
  createAnswer = async (req, res, next) => {
    const { user } = res.locals;
    const { questionId } = req.params;
    const { content } = req.body;
    const answer = {
      userId: user.userId,
      nickname: user.nickname,
      avatar: user.avatar,
      questionId,
      content,
    };
    // 본인 질문에 답변 작성 불가

    // 해결된 게시글에 답변 작성 불가
    const isDone = await this.questionsRepository.findByQna(questionId);

    if (isDone.selectedAnswer > 0)
      throw new Error('해결완료 된 질문에 답변할 수 없습니다.');

    // user별 답변 중복작성 불가
    const isDuplicate = await this.answersRepository.findByDuplicate(
      questionId,
      user.userId
    );
    if (isDuplicate) throw new Error('답변을 중복해서 작성할 수 없습니다.');

    // 한 질문에 답변 10개 제한
    const answerCount = await this.answersRepository.answerCountByQuestionId(
      questionId
    );
    if (answerCount === 10)
      throw new Error('한 질문에 대한 답변은 10개를 넘을 수 없습니다.');

    await this.answersRepository.createAnswer(answer);

    res.status(200);
  };

  // 답변 불러오기
  getAnswer = async (req, res, next) => {
    const { questionId } = req.params;
    const answer = await this.answersRepository.findByQuestionId(questionId);
    if (!questionId || !answer) throw new Error('잘못된 요청 입니다.');

    return answer;
  };

  // 답변 수정하기
  updateAnswer = async (req, res, next) => {
    const { answerId } = req.params;
    const { title, content } = req.body;
    const { user } = res.locals;
    const answer = await this.answersRepository.findByAnswerId(answerId);

    if (answer.userId !== user.userId)
      throw new Error('본인만 수정할 수 있습니다.');
    if (!answer) throw new Error('잘못된 요청입니다.');

    await this.answersRepository.updateAnswer(answerId, title, content);
  };

  // 답변 삭제하기
  deleteAnswer = async (req, res, next) => {
    const { user } = res.locals;
    const { answerId } = req.params;
    const findByWriter = await this.answersRepository.findByAnswerId(answerId);

    if (findByWriter.userId !== user.userId)
      throw new Error('본인만 삭제할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    await this.answersRepository.deleteAnswer(answerId);
  };

  updateImage = async (userId, answersId, imageFileName) => {
    if (!imageFileName) throw new Error('게시물 이미지가 빈 값');
    const findByWriter = await this.answersRepository.findByQna(answersId);

    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    const updateImageData = await this.answersRepository.updateImage(
      questionId,
      process.env.S3_STORAGE_URL + imageFileName
    );

    return updateImageData;
  };

  findByUserId = async (req, res) => {
    const { userId } = req.params;
    return this.answersRepository.findByUserId(userId);
  };
}

module.exports = AnswersService;
