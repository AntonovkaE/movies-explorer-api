const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { Unauthorized } = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  console.log('check')
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    console.log(`${token} auth`)
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация проблема с токеном');
  }
  req.user = payload;
  return next();
};
