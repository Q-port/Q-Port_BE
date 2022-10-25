require('dotenv').config();

// 로그인 되어 있는 유저일 경우 Error를 반환한다.
module.exports = (req, res, next) => {
  try {
    const cookies = req.cookies[process.env.COOKIE_NAME];
    if (cookies) {
      return res.status(403).send({
        errorMessage: '이미 로그인이 되어있습니다.',
      });
    }

    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');
    if (!authToken || authType !== 'Bearer') {
      return res.status(401).send({
        errorMessage: '로그인 후 이용 가능한 기능입니다.',
      });
    }

    next();
  } catch (error) {
    console.trace(error);
    return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  }
};
