const LoginService = require('../services/login.service');

class LoginController {
  loginService = new LoginService();
  login = async (req, res) => {
    try {
    
      const { email, password } = await loginSchema.validateAsync(req.body);


      const loginResult = await this.loginService.findUser(email, password);

      if (!loginResult) {
        return res.status(412).send({
          errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
      }
      // if문 통과했다면 db 에 존재하는 유저 => 쿠키와 토큰 만료시간 설정해서 생성한 뒤 response 전달

      return res.status(200).send(loginResult);
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  };
}

module.exports = LoginController;
