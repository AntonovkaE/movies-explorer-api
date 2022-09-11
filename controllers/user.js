const User = require('../models/user');
const {
  NotFoundError,
} = require('../utils/errors/NotFoundError');
const { BadRequest } = require('../utils/errors/BadRequestError');
const { ConflictError } = require('../utils/errors/ConflictError');
const bcrypt = require('bcrypt');
const { Unauthorized } = require('../utils/errors/UnauthorizedError');
const jwt = require('jsonwebtoken');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    runValidators: true,
    new: true,
  })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};


module.exports.createUser = (req, res, next) => {
  const {
    name,
    password,
    email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => res.send(
      {
        name, email, id: user._id,
      },
    ))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(email, password)

      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Неправильные почта или пароль'));
    });
};


