const { Users } = require('../models');

class LoginRepository {
  findUser = async (email, password) => {
    const user = await Users.findOne({ where: {  email, password } });
    return user;
  };
}

module.exports = LoginRepository;
