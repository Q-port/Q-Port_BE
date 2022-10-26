const bcrypt = require('bcrypt');
require('dotenv').config();
const LoginRepository = require('../repositories/login.repository');
const jwt = require('jsonwebtoken');


class LoginService {
  loginRepository = new LoginRepository();

  findUser = async (email, password) => {
    const user = await this.loginRepository.findUser(email);
    if (!user) throw new Error('email 또는 password를 확인해 주세요');

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error('email 또는 password를 확인해 주세요');

    // 유저가 있으니 토큰 만들어서 전달
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
      // 토큰 만료시간 1시간 
      expiresIn: '1h',
    });

    return  token ;
  };
}

module.exports = LoginService
