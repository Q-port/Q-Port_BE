const { User } = require('../models');

class LoginRepository {
  findUser = async (email, password) => {

    const user = await User.findOne({ where: {  email, password } });
    return user;
  };
}

module.exports = LoginRepository;
