const QuestionsService = require('../services/questions.service');

class QuestionsController {
  questionsService = new QuestionsService();

  // 작성여부에 따른 status를 클라이언트로 전달
  createQna = async (req, res) => {
    try {
    console.log(req)
      await this.questionsService.createQna(req, res);

      res.status(200).send({ ok: true, message: '질문 작성 완료' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // return된 질문글 목록을 전달
  getQna = async (req, res) => {
    try {
      const qna = await this.questionsService.getQna();
      res.status(200).json({ data: qna });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // return된 질문글 상세조회 데이터를 전달
  findByQna = async (req, res) => {
    try {
      // 조회수 기능을 위해 request 전달
      await this.questionsService.qnaViewCheck(req);

      const detail = await this.questionsService.findByQna(req, res);

      res.status(200).json({ data: detail });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 수정 성공 여부에 따른 status를 전달
  updateQna = async (req, res) => {
    try {
      await this.questionsService.updateQna(req, res);

      res.status(200).send({ ok: true, message: '게시글이 수정되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 삭제 성공 여부에 따른 status를 전달
  deleteQna = async (req, res) => {
    try {
      await this.questionsService.deleteQna(req, res);

      res.status(200).send({ ok: true, message: '게시글이 삭제되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 채택 성공 여부에 따른 status를 전달
  selectQna = async (req, res) => {
    try {
      await this.questionsService.selectQna(req, res);

      res.status(200).send({ ok: true, message: '채택되었습니다.' });
    } catch (error) {
      console.log(error)
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 내가 작성한 질문글 목록
  myQuestions = async (req, res) => {
    try {
      const myQuestions = await this.questionsService.myQuestions(req, res);

      res.status(200).json({ data: myQuestions });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 질문글들의 제목을 검색
  qnaSearch = async (req, res) => {
    try {
      const qnaSearch = await this.questionsService.qnaSearch(req, res);

      res.status(200).json({ data: qnaSearch });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = QuestionsController;
