const SignupRepository = require('../repositories/signup.repository');

class SignupService {
  signupRepository = new SignupRepository();
  //회원가입
  findUser = async (email, nickname) => {
    return await this.signupRepository.finduser(email, nickname);
  }

  signup = async (email, nickname, password) => {
    const num = (Math.ceil(Math.random() * 12) + '').padStart(2, '0');

    await this.signupRepository.signup({
    email,
    nickname,
    password,
    avatar: `http://spartacodingclub.shop/static/images/rtans/SpartaIcon${num}.png`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    });
  };
};

module.exports = SignupService;
