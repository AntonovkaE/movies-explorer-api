const User = require('../models/user');
const {
  NotFoundError,
} = require('../utils/errors/NotFoundError');
const { BadRequest } = require('../utils/errors/BadRequestError');

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
