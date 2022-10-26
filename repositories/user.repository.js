const { User } = require('../models');

class UserRepository {
  //회원정보조회
  findOneUser = async (userId) => {
    return await User.findByPk(userId);
  };
  //  attributes: { exclude: ['password'] },

  //프로필사진업로드
  updateImg = async (userId, avatar) => {
    await User.update({ avatar }, { where: { userId } });
  };

  //명예의전당
  // getRanks = async (selectedAnswer) => {
  //   console.log(selectedAnswer)
  //   return await User.find({
  //     attributes:['selectedAnswer'],
  //     where: {userId},
  //     include: [model. User],
  //     order,limit:5
  //   })
  // }

  getRanks = async () => {
    return await User.findAll({
      limit: 5,
      attributes: {
        exclude: ['password'],
      },
      order: [['selectedAnswer', 'desc']],
    });
  };

  updateNickname = async (userId, nickname) => {
    await User.update({ nickname }, { where: { userId } });
  };

  updatePassword = async (userId, password) => {
    await User.update({ password }, { where: { userId } });
  };

  // 회원정보수정
  updateUser = async (userId, nickname, password) => {
    await User.update({ nickname, password }, { where: { userId } });
  };

  findByNickname = async (nickname) => {
    return await User.findOne({ where: { nickname } });
  };
}

module.exports = UserRepository;
