const { User } = require('../models');

class LoginRepository {
  findUser = async (email) => {

    const user = await User.findOne({ where: {  email } });
    return user;
  };
}

module.exports = LoginRepository;
