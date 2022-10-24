require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const { SECRET_KEY } = process.env;
if (!SECRET_KEY) throw new Error('SECRET_KEY is required!!');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');
  if (!authToken || authType !== 'Bearer') {
    return res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }

  try {
    const { userId } = jwt.verify(authToken, SECRET_KEY);
    Users.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};