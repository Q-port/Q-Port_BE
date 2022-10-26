const bcrypt = require('bcrypt'); 
const SignupRepository = require('../repositories/signup.repository');

class SignupService {
  signupRepository = new SignupRepository();
  //회원가입
  findUser = async (email, nickname) => {
    return await this.signupRepository.finduser(email, nickname);
  }

  signup = async (email, nickname, password) => {
    const num = (Math.ceil(Math.random() * 12) + '').padStart(2, '0');

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
  );
    

    await this.signupRepository.signup({
    email,
    nickname,
    password: hashedPassword,
    avatar: `http://spartacodingclub.shop/static/images/rtans/SpartaIcon${num}.png`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    });
  };
};

module.exports = SignupService;
