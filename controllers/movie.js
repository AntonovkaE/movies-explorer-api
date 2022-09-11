const Movie = require('../models/movie');
const {
  NotFoundError,
} = require('../utils/errors/NotFoundError');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { BadRequest } = require('../utils/errors/BadRequestError');

module.exports.gitMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError('Фильма с таким айди не существует'))
    .then((movie) => {
      return movie.remove({ _id: req.params.id })
        .then((removedMovie) => res.send(removedMovie));
    })
    .catch(next);
};
