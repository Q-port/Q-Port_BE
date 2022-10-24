const { User } = require('../models');

class SignupRepository {
  signup = async (email, nickname, password) => {  
    await User.create({ email, nickname, password, createdAt:Date.now(),updatedAt:Date.now() });
  };

  
  finduser = async (email) => {
    return await User.findOne({ where: { email} });
  }
}

module.exports = SignupRepository;
