const { User } = require('../models');

class UserRepository {
  //회원정보조회
  findOneUser = async (userId) => {
    return await User.findByPk(userId);
  };
  //  attributes: { exclude: ['password'] },

  // 회원정보수정
  updateUser = async (userId, nickname, password) => {
    await User.update({ nickname, password }, { where: { userId } });
  };

  //프로필사진업로드
  updateImg = async (userId, avatar) => {
    await User.update({ avatar }, { where: { userId } });
  };
}

module.exports = UserRepository;
