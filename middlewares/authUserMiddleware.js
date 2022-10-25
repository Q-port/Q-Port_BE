require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');


// 유저 인증에 실패하더라도 에러를 반환하지 않는다.
module.exports = async (req, res, next) => {
  try {
    // const { authorization } = req.headers;
    // const [authType, authToken] = (authorization || '').split(' ');
    // if (!authToken || authType !== 'Bearer') {
    //   res.status(401).send({
    //     errorMessage: '로그인 후 이용 가능한 기능입니다.',
    //   });
    //   return;
    // }

    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
    const user = await Users.findByPk(userId);

    res.locals.user = user;
    next();
    
  } catch (error) {
    res.locals.user = { userId: undefined };
    next();
  }
};
