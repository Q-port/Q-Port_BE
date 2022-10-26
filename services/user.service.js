const UserRepository = require('../repositories/user.repository');
require('dotenv').config();

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
  updateUser = async (req,res) => { // db 비밀번호 입력값과 맞는지
      const {nickname, newPassword} = req.body
      const {userId} =res.locals.user
      await this.userRepository.updateUser(userId, nickname, newPassword);
  };

  //프로필사진업로드
  updateImg = async (userId,imageFileName) => {
    if (!imageFileName) throw new Error('이미지를 업로드 해주세요.');

    const avatar = process.env.S3_STORAGE_URL + imageFileName


    await this.userRepository.updateImg(userId,avatar);
  }
};

module.exports = UserService;


      