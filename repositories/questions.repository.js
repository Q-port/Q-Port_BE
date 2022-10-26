const { Question, Answer, User, qnaView } = require('../models');

class QuestionsRepository {
  constructor() {
    this.Question = Question;
    this.Answer = Answer;
    this.User = User;
    this.qnaView = qnaView;
  }

  // 질문글 저장시 시간값 형식을 1666567749235 처럼 하기위해 Date.now() 적용
  createQna = async (qna) => {
    await this.Question.create(qna);
  };

  // 질문글 목록 조회시 글쓴시간 기준으로 내림차순 정렬후 return
  getQna = async () => {
    return await this.Question.findAll({
      attributes: {
        exclude: ['content', 'imgUrl'],
      },
      order: [['createdAt', 'desc']],
    });
  };

  // 질문글의 id를 받아와 내용이 포함된 질문글 1개를 return
  findByQna = async (questionId) => {
    return await this.Question.findOne({
      where: {
        questionId,
      },
    });
  };

  // 질문글의 id를 받아와 제목, 내용, 수정시간을 저장
  updateQna = async ({ questionId, title, content, imgUrl, updatedAt }) => {
    await this.Question.update(
      { title, content, imgUrl, updatedAt },
      { where: { questionId } }
    );
  };

  // 질문글의 id를 받아와 질문글을 삭제
  deleteQna = async (questionId) => {
    await this.Question.destroy({
      where: {
        questionId,
      },
    });
  };

  // 질문글의 id를 받아와 질문글의 채택란에 답변글의 id를 저장
  // 답변글의 id를 받아와 답변글 게시자의 userId를 찾아 채택횟수를 증가
  selectQna = async (answerUserId, questionId, answerId) => {
    await this.Question.update(
      { selectedAnswer: answerId },
      { where: { questionId } }
    );
    await this.User.increment(
      { selectedAnswer: 1 },
      { where: { userId: answerUserId } }
    );
  };

  // 해당 아이피가 조회수를 올렸는지 확인
  qnaViewCheck = async ({ ip, questionId }) => {
    const result = await this.qnaView.findOne({ where: { ip, questionId } });
    return result;
  };

  // 게시글의 조회수를 올리고 아이피와 게시글ID, 시간을 DB에 저장
  createView = async ({ questionId, ip, time }) => {
    await this.qnaView.create({ questionId, ip, time });
    await this.Question.increment({ view: 1 }, { where: { questionId } });
  };

  // 게시글의 조회수를 올리고 시간을 DB에 업데이트
  qnaViewCount = async ({ ip, time, questionId }) => {
    await this.qnaView.update({ time }, { where: { ip, questionId } });
    await this.Question.increment({ view: 1 }, { where: { questionId } });
  };

  // 내가 쓴 질문글을 내림차순으로 내용과 이미지주소 제외해서 리턴.
  myQuestions = async (userId) => {
    return await this.Question.findAll({
      where: { userId },
      attributes: {
        exclude: ['content', 'imgUrl'],
      },
      order: [['createdAt', 'desc']],
    });
  };

  // 채택기능을 위해 답변글ID로 답변글을 리턴.
  findByAnswerUser = async (answerId) => {
    return await this.Answer.findByPk(answerId);
  };
}

module.exports = QuestionsRepository;
