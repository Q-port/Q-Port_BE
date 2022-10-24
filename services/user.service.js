const UserRepository = require('../repositories/user.repository');

class UserService {
  userRepository = new UserRepository();
  //회원정보조회
  findOneUser = async (userId) => { 
    try {
        const mypage = await this.UserRepository.findOneUser(userId);
        return {
          userId: mypage.userId,
          email: mypage.email,
          nickname: mypage.nickname,
          avatar: mypage.avatar,
          selectedAnswer: mypage.selectedAnswer,
          password: mypage.password,
          createdAt: mypage.createdAt,
          updatedAt: mypage.updatedAt
        }
    } catch (error) {
        return {            
        message: '회원정보 조회에 실패했습니다',
        status: 400,
        }
    }
  }


  //회원정보수정
  updateUser = async (userId, email, nickname, password) => {

    try {
      await this.userRepository.updateUser(userId, email, nickname, password);
      return {
        userId: updateUser.userId,
        email: updateUser.email,
        nickname: updateUser.nickname,
        password: updateUser.password,
      };
    } catch (e) {
      return {
        message: '회원 정보가 수정되지 않았습니다.',
        status: 400,
      };
    }
  };
};

module.exports = UserService;


      