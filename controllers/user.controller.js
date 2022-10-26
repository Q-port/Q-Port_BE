const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  //내정보조회
  getUser = async (req, res) => {
    res.status(200).json({ data: res.locals });
  };

  //회원정보조회
  getOther = async (req, res) => {
    try {
      const { userId } = req.params;
      const userpage = await this.userService.findOneUser(userId);

      res.status(200).json({ data: userpage });
    } catch (error) {
      return {
        ok: false,
        message: '회원정보조회에실패했습니다',
        status: 400,
      };
    }
  };

  //회원정보수정
  updateUser = async (req, res) => {
    try {
      const { oldPassword, newPassword, confirm } = req.body;
      if (oldPassword === newPassword || oldPassword === confirm) {
        throw new Error('기존의 패스워드와 동일합니다');
      }
      await this.userService.updateUser(req, res);
      res.status(200).send({ ok: true, message: '회원정보가 수정되었습니다' });
    } catch (e) {
      res
        .status(400)
        .send({ ok: false, message: '회원정보수정에 실패했습니다' });
    }
  };

  //프로필사진업로드
  updateImg = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      let imageFileName;
      if (req.file) {
        imageFileName = req.file.key;
      } else {
        null;
      }

      await this.userService.updateImg(userId,imageFileName)

      await this.userService.updateImg(req, res);
      res.status(200).send({ ok: true, message: '이미지가 수정되었습니다' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = UserController;
