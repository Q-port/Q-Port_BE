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
    const imageFileName = req.file ? req.file.key : null;

    const imgUrl = imageFileName
      ? process.env.S3_STORAGE_URL + imageFileName
      : null;

    const answer = {
      questionId: questionId,
      userId: user.userId,
      nickname: user.nickname,
      avatar: user.avatar,
      content,
      imgUrl,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (!content.trim()) throw new Error('내용을 입력해주세요.');

    // 본인 질문에 답변 작성 불가
    const isMyQuestion = await this.questionsRepository.findByQna(questionId);
    if (isMyQuestion.userId === user.userId)
      throw new Error('본인의 질문에 답변할 수 없습니다.');

    // 해결된 게시글에 답변 작성 불가
    const isDone = await this.questionsRepository.findByQna(questionId);
    if (isDone.selectedAnswer > 0)
      throw new Error('해결완료 된 질문에 답변할 수 없습니다.');

    // 중복작성 불가
    // 해당 질문에 이전에 답변한 유저 답변 불가
    const isDuplicateUser = await this.answersRepository.findByDuplicate(
      questionId,
      user.userId
    );
    if (isDuplicateUser) throw new Error('답변을 중복해서 작성할 수 없습니다.');

    // 한 질문에 답변 10개 제한
    const answerCount = await this.answersRepository.answerCountByQuestionId(
      questionId
    );
    if (answerCount === 10)
      throw new Error('한 질문에 대한 답변은 10개를 넘을 수 없습니다.');

    // 가공된 질문글 데이터를 repository로 전달
    await this.answersRepository.createAnswer(answer);
    await this.answersRepository.addAnswerCount({ questionId });

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
    const { content } = req.body;
    const { user } = res.locals;

    const imageFileName = req.file ? req.file.key : undefined;

    const imgUrl = imageFileName
      ? process.env.S3_STORAGE_URL + imageFileName
      : undefined;

    // 내용 유효성 검사
    if (!content.trim()) throw new Error('내용을 입력해주세요.');

    // 본인의 게시글인지 확인
    const answer = await this.answersRepository.findByAnswerId(answerId);
    if (answer.userId !== user.userId)
      throw new Error('본인만 수정할 수 있습니다.');
    if (!answer) throw new Error('잘못된 요청입니다.');

    await this.answersRepository.updateAnswer(answerId, content, imgUrl);

    res.status(200);
  };

  // 답변 삭제하기
  deleteAnswer = async (req, res, next) => {
    const { user } = res.locals;
    const { answerId } = req.params;
    const answer = await this.answersRepository.findByAnswerId(answerId);

    if (answer.userId !== user.userId)
      throw new Error('본인만 삭제할 수 있습니다.');
    if (!answer) throw new Error('잘못된 요청입니다.');

    await this.answersRepository.deleteAnswer(answerId);
    const questionId = answer.questionId;
    await this.answersRepository.subtractAnswerCount({ questionId });
  };

  // 이미지
  updateImage = async (req, res) => {
    const { userId } = res.locals.user;
    const { answerId } = req.params;
    const imageFileName = req.file ? req.file.key : null;

    if (!imageFileName) throw new Error('게시물 이미지가 빈 값');
    const findByWriter = await this.answersRepository.findByAnswerId(answerId);

    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    await this.answersRepository.updateImage(
      answerId,
      process.env.S3_STORAGE_URL + imageFileName
    );
  };

  // userId기준 답변 목록 불러오기
  getAnswersByUserId = async (req, res) => {
    const { userId } = req.params;
    const answers = this.answersRepository.findByUserId(userId);

    for (const first in answers) {
      for (const key in first) {
        if (user.hasOwnProperty(key)) {
          console.log(`${key}: ${user[key]}`);
        }
      }
    }

    return answers;
  };
}

module.exports = AnswersService;
