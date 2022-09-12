const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { Unauthorized } = require('../utils/errors/UnauthorizedError');
const { localJWT } = require('../utils/jwt');
const { unauthorizedMessage } = require('../utils/constances');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(unauthorizedMessage);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token,NODE_ENV === 'production' ? JWT_SECRET : localJWT);
  } catch (err) {
    throw new Unauthorized(unauthorizedMessage);
  }
  req.user = payload;
  return next();
};
