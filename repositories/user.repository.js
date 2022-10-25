const { User } = require('../models');

class UserRepository {

  //내정보조회
  findOneUser = async (userId) =>{
    const mypage = await User.findByPk(userId)

    return mypage;
  }


  //회원정보조회
findOneUser = async (userId) =>{
    const userpage = await User.findByPk(userId)

    return userpage;
  }

    // 회원정보수정
  updatePost = async (userId, email, nickname, password) => {
    const updateUser = Posts.update({ email, nickname }, { where: {userId, password} });
    return updateUser;
  };

}


module.exports = UserRepository;

