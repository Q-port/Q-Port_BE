const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
module.exports = async (req, res, next) => {
  try {
    const cookies =
      req.headers.authorization || req.cookies[process.env.COOKIE_NAME];

    if (!cookies) {
      return res.status(403).send({
        ok: false,
        errorMessage: '로그인이 필요한 기능입니다.',
      });
    }

    const [tokenType, tokenValue] = cookies.split(' ');
    if (tokenType !== 'Bearer') {
      return res.status(403).send({
        ok: false,
        errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.',
      });
    }

    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);

    const user = await User.findByPk(userId);

    res.locals.user = user;
    next();
  } catch (error) {
    console.trace(error);
    return res.status(403).send({
      ok: false,
      errorMessage: '로그인이 필요한 기능입니다.',
    });
  }
};
