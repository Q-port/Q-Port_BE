const QuestionsRepository = require('../repositories/questions.repository');
require('dotenv').config();

class QuestionsService {
  questionsRepository = new QuestionsRepository();

  // 작성될 질문글의 제목과 내용을 받아 repository로 전달
  createQna = async (req, res, next) => {
    const { user } = res.locals;

    const { title, content } = req.body;

    const qna = {
      userId: user.userId,
      nickname: user.nickname,
      avatar: user.avatar,
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // 가공된 질문글 데이터를 repository로 전달
    await this.questionsRepository.createQna(qna);
  };

  getQna = async (req, res, next) => {
    return await this.questionsRepository.getQna();
  };

  // 질문글 상세 조회를 위한 질문글 id를 parameter로 받아 repository로 전달
  findByQna = async (req, res, next) => {
    const { questionId } = req.params;
    const detail = await this.questionsRepository.findByQna(questionId);

    // 게시글이 없거나 잘못된 parameter 일 경우 예외처리
    if (!questionId || !detail) throw new Error('잘못된 요청 입니다.');

    return detail;
  };

  // 수정하기 위해 로그인된 유저와 질문글 게시자 일치 여부 검증
  updateQna = async (req, res, next) => {
    const { questionId } = req.params;
    const { title, content } = req.body;
    const { userId } = res.locals.user;

    // 질문글게시자와 로그인된 유저가 같은지 검증
    const findByWriter = await this.questionsRepository.findByQna(questionId);
    // 요청한 질문글이 존재하지 않을 때 예외처리
    if (!findByWriter) throw new Error('잘못된 요청입니다.');
    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');

    await this.questionsRepository.updateQna(questionId, title, content);
  };

  // 삭제하기 위해 로그인된 유저와 질문글게시자 일치 여부 검증
  deleteQna = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { questionId } = req.params;

    // 질문글게시자와 로그인된 유저가 같은지 검증
    const findByWriter = await this.questionsRepository.findByQna(questionId);
    // 요청한 질문글이 존재하지 않을 때 예외처리
    if (!findByWriter) throw new Error('잘못된 요청입니다.');
    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');

    // 질문글의 id를 전달
    await this.questionsRepository.deleteQna(questionId);
  };

  // Request parameter로 받아온 질문글 id와 답변글 id, 로그인된 유저의 id를
  // 받아와 검증 후 repository로 전달
  selectQna = async (req, res, next) => {
    const { questionId, answerId } = req.params;
    const { userId } = res.locals.user;

    // 질문글게시자와 로그인된 유저가 같은지 검증
    const findByWriter = await this.questionsRepository.findByQna(questionId);
    // 요청한 질문글이 존재하지 않을 때 예외처리
    if (!findByWriter) throw new Error('잘못된 요청입니다.');
    if (findByWriter.userId !== userId)
      throw new Error('본인만 채택할 수 있습니다.');

    const findByAnswerUserId = await this.questionsRepository.findByAnswerUser(
      answerId
    );
    const answerUserId = findByAnswerUserId.userId;

    // 답변글 게시자의 userId와 질문글 id, 답변글 id를 전달
    await this.questionsRepository.selectQna(
      answerUserId,
      questionId,
      answerId
    );
  };

  // 질문글의 id와 로그인된 유저의 id, 이미지 파일 이름을 repository로 전달
  updateImage = async (userId, questionId, imageFileName) => {
    if (!imageFileName) throw new Error('이미지를 업로드 해주세요.ㅋ');

    // 질문글게시자와 로그인된 유저가 같은지 검증
    const findByWriter = await this.questionsRepository.findByQna(questionId);
    if (findByWriter.userId !== userId)
      throw new Error('본인만 수정할 수 있습니다.');

    // 요청한 질문글이 존재하지 않을 때 예외처리
    if (!findByWriter) throw new Error('잘못된 요청입니다.');

    // 질문글의 id와 s3이미지 주소를 repository로 전달
    const updateImageData = await this.questionsRepository.updateImage(
      questionId,
      process.env.S3_STORAGE_URL + imageFileName
    );

    return updateImageData;
  };
  // 게시물이 조회될때 마다 확인해서 30000ms (5초)
  // 이상이거나 테이블 안에 아이피가 없으면 view++
  qnaViewCheck = async (req) => {
    const { questionId } = req.params;
    const ipAdress = req.ip.split(':').pop();
    const getTime = Date.now();
    const existIp = await this.questionsRepository.qnaViewCheck({
      ip: ipAdress,
      questionId,
    });

    if (!existIp)
      return await this.questionsRepository.createView({
        questionId,
        ip: ipAdress,
        time: getTime,
      });
    const intervalCount =
      getTime.toString().substring(7) - existIp.time.substring(7) > 5000;
    if (intervalCount)
      await this.questionsRepository.qnaViewCount({
        ip: ipAdress,
        time: getTime,
        questionId,
      });
  };

  myQuestions = async (req, res, next) => {
    const { userId } = req.params;
    return await this.questionsRepository.myQuestions(userId);
  };
}

module.exports = QuestionsService;
