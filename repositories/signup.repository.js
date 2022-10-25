const { User } = require('../models');
const { Op } = require("sequelize");

class SignupRepository {
  signup = async (user) => {  
    await User.create(user);
  };

  
  finduser = async (email, nickname) => {
    return await User.findOne({
      where: {
      [Op.or]: [{ email }, { nickname }],
      },
      });
  }
}

module.exports = SignupRepository;
