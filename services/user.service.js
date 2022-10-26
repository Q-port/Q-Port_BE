const UserRepository = require('../repositories/user.repository');

class UserService {
  userRepository = new UserRepository();

  //회원정보조회
  findOneUser = async (userId) => { 
        const userpage = await this.userRepository.findOneUser(userId);
        return {
          userId: userpage.userId,
          email: userpage.email,
          nickname: userpage.nickname,
          avatar: userpage.avatar,
          selectedAnswer: userpage.selectedAnswer,
          createdAt: userpage.createdAt,
          updatedAt: userpage.updatedAt
        }
      } 

  //회원정보수정
  updateUser = async (req,res) => {
      const {nickname, newPassword} = req.body
      const {userId} =res.locals.user
      await this.userRepository.updateUser(userId, nickname, newPassword);
  };

  //프로필사진업로드
  updateImg = async (avatar) => {
    try {
      await this.userRepository.updateImg(avatar);
    } catch (error) {
      return {
        ok: false,
        message: '이미지가 수정되지 않았습니다.',
        status: 400,
      };
    }
  }
};

module.exports = UserService;


      