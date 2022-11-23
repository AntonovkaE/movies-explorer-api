const Movie = require('../models/movie');
const {
  NotFoundError,
} = require('../utils/errors/NotFoundError');

const { BadRequest } = require('../utils/errors/BadRequestError');
const {
  badRequestMessage, badRequestFilmMessage, notFoundFilmMessage, forbiddenMessage,
} = require('../utils/constances');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest(badRequestMessage));
      } else {
        next(err);
      }
    });
};
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner,
    movieId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(badRequestFilmMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(notFoundFilmMessage))
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError(forbiddenMessage);
      }
      return movie.remove({ _id: req.params.id });
    })
    .then((removedMovie) => res.send(removedMovie))
    .catch(next);
};
