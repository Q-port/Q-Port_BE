require('dotenv').config();
const LoginRepository = require('../repositories/login.repository');
const jwt = require('jsonwebtoken');


class LoginService {
  loginRepository = new LoginRepository();

  findUser = async (email, password) => {

    const user = await this.loginRepository.findUser(email, password);
    if (!user) return;

    // 유저가 있으니 토큰 만들어서 전달
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
      // 토큰 만료시간 1시간 
      expiresIn: '1h',
    });

    return  token ;
  };
}

module.exports = LoginService;
