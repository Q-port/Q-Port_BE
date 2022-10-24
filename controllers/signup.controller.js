const SignupService = require('../services/signup.service');



class SignupController {
  signupService = new SignupService(); 
  //회원가입
  signup = async (req, res) => {
    const { email, nickname, password, confirm } = req.body;
   
    if (password !== confirm) {
      return res.status(400).send({
        errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
      });
    }
    if (password.includes(nickname)) {
      return res.status(400).send({
        errorMessage: '패스워드에 닉네임이 포함될 수 없습니다.',
      });
    }
    if (password.length < 4) {
      return res.status(400).send({
        errorMessage: '패스워드는 4자 이상이어야 합니다.',
      });
    }

    const signup = await this.signupService.signup(email, nickname, password);
    res.send ({message: "1234"})
  };


}

module.exports = SignupController;
