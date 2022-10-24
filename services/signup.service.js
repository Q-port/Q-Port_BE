const SignupRepository = require('../repositories/signup.repository');

class SignupService {
  signupRepository = new SignupRepository();
  //회원가입
  signup = async (email, nickname, password) => {
    const signup = await this.signupRepository.signup(email, nickname, password);

    return signup;
  };
};

module.exports = SignupService;
