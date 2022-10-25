require('dotenv').config();
const LoginService = require('../services/login.service');
const joi = require('../util/joi')


class LoginController {
  loginService = new LoginService();
  login = async (req, res) => {
    try {
      const { email, password } = await joi.loginSchema.validateAsync(req.body);

      const loginResult = await this.loginService.findUser(email, password);

      if (!loginResult) {
        return res.status(412).send({
          errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
      }
      // if문 통과했다면 db 에 존재하는 유저 => 쿠키와 토큰 만료시간 설정해서 생성한 뒤 response 전달

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);
      res.cookie(process.env.COOKIE_NAME, `Bearer ${loginResult}`, {
      expires: expires,
      });
      res.send({message: '로그인되었습니다'})
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      res.status(400).send({
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  };
}

module.exports = LoginController;
