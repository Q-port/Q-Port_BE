const UserRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
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
      updatedAt: userpage.updatedAt,
    };
  };

  //회원정보수정
  updateUser = async (req, res) => {
    const { nickname, oldPassword, newPassword, confirm } = req.body;
    const { user } = res.locals;

    if (nickname && oldPassword && newPassword && confirm) {
      // 1. 모든 정보 변경
      await this.passwordValidation(
        user.password,
        oldPassword,
        newPassword,
        confirm
      );
      await this.updatePassword(user, newPassword);
      await this.userRepository.updateNickname(user.userId, nickname);
    }
    // if (!nickname && oldPassword && newPassword && confirm) {
    // 2. 비밀번호만 변경
    //   this.passwordValidation(user.password, oldPassword, newPassword, confirm);
    //   this.updatePassword(user, newPassword);
    // } else
    else if (nickname && !oldPassword && !newPassword && !confirm) {
      // 3. 닉네임만 변경
      if (nickname === user.nickname) {
        throw new Error('변경할 사항이 없습니다.');
      }
      const existNickname = await this.userRepository.findByNickname(nickname);
      console.log(existNickname);
      if (existNickname) throw new Error('중복된 닉네임입니다.');
      await this.userRepository.updateNickname(user.userId, nickname);
    } else throw new Error('요청한 데이터의 형식이 올바르지 않습니다.');
  };

  // 비밀번호 유효성 검사
  passwordValidation = async (
    userPassword,
    oldPassword,
    newPassword,
    confirm
  ) => {
    if (oldPassword === newPassword)
      throw new Error('새 패스워드는 기존 비밀번호와 달라야 합니다.');
    if (newPassword !== confirm)
      throw new Error('새 패스워드가 서로 일치하지 않습니다.');
    const isCorrectPassword = await bcrypt.compare(oldPassword, userPassword);
    if (!isCorrectPassword)
      throw new Error('기존 패스워드가 일치하지 않습니다.');
  };

  // 비밀번호 업데이트
  updatePassword = async (user, newPassword) => {
    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );
    await this.userRepository.updatePassword(user.userId, hashedPassword);
  };

  //프로필사진업로드
  updateImg = async (userId, imageFileName) => {
    if (!imageFileName) throw new Error('이미지를 업로드 해주세요.');
    const avatar = process.env.S3_STORAGE_URL + imageFileName;
    await this.userRepository.updateImg(userId, avatar);
  };

  //명예의전당
  getRanks = async () => {
    // const ranks = await this.userRepository.getRanks(selectedAnswer)
    return await this.userRepository.getRanks();
  };
}

module.exports = UserService;
