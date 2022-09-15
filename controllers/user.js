const bcrypt = require('bcrypt');
const User = require('../models/user');
const {
  NotFoundError,
} = require('../utils/errors/NotFoundError');
const { BadRequest } = require('../utils/errors/BadRequestError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { Unauthorized } = require('../utils/errors/UnauthorizedError');
const {
  notFoundUserMessage, badRequestUserMessage, conflictEmailMessage, wrongUserDataMessage,
} = require('../utils/constances');
const { getJwtToken } = require('../utils/jwt');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id).orFail(new NotFoundError(notFoundUserMessage)).then((user) => {
    const { name, email } = user;
    res.status(200).send({ name, email });
  }).catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name, email,
  }, {
    runValidators: true, new: true,
  }).orFail(new NotFoundError(notFoundUserMessage))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(conflictEmailMessage));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest(badRequestUserMessage));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    email, name, password: hash,
  })).then((user) => res.send({
    name, email, id: user._id,
  })).catch((err) => {
    if (err.code === 11000) {
      next(new ConflictError(conflictEmailMessage));
    } else if (err.name === 'ValidationError') {
      next(new BadRequest(badRequestUserMessage));
    } else {
      next(err);
    }
  });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  return User.findUserByCredentials(email, password).then((user) => {
    const token = getJwtToken(user._id);
    res.send({ token });
  }).catch(() => {
    next(new Unauthorized(wrongUserDataMessage));
  });
};
