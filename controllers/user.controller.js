const UserService = require('../services/user.service');



class UserController {
    userService = new UserService(); 
  
  //회원정보조회
  getUser = async (req,res) => {
    const {userId} = res.locals.user
    const mypage = await this.userService.findOneUser(userId)

    res.status(200).json({data:mypage})
  }

  //회원정보수정
  updateUser = async (req,res) => {
    const {userId, email, nickname, password} = res.locals.user
    
    await this.userService.updateUser(userId, email, nickname, password)
    res.status(200).send('회원정보가 수정되었습니다')
  }
}

module.exports = UserController;
