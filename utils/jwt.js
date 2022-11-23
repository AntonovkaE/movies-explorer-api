const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const localJWT = 'super-strong-secret';

const getJwtToken = (id) => {
  const token = jwt.sign({ _id: id }, NODE_ENV !== 'production' ? 'super-strong-secret' : JWT_SECRET, { expiresIn: '7d' });
  return token;
};

module.exports = { getJwtToken, localJWT };
