const UserService = require('../services/user.service');

class UserController {
    userService = new UserService(); 
  
  //내정보조회
 getUser = async (req,res) => {
  res.status(200).json({data:res.locals})
 }

  //회원정보조회
  getOther = async (req,res) => {
    try {
      const {userId} = req.params
      const userpage = await this.userService.findOneUser(userId)
  
      res.status(200).json({data:userpage})
      
    } catch (error) {
      return {
        message:"회원정보조회에실패했습니다",
        status:400
      }
      
    }

  }

  //회원정보수정
  updateUser = async (req,res) => {
    const {nickname, oldPassword, newPassword, confirm} = req.body
    
    await this.userService.updateUser(req,res)
    res.status(200).send('회원정보가 수정되었습니다')
  }
}

module.exports = UserController;
