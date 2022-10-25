const { User } = require('../models');
const { Op } = require("sequelize");

class SignupRepository {
  finduser = async (email, nickname) => {
    return await User.findOne({
      where: {
      [Op.or]: [{ email }, { nickname }],
      },
      });
  }

  signup = async (user) => {  
    await User.create(user);
  };
}

module.exports = SignupRepository;
