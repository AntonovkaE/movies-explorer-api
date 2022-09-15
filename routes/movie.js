const routerMovie = require('express')
  .Router();
const { validateId, validateCreateMovie } = require('../utils/validation');
const { getMovies, deleteMovie, createMovie } = require('../controllers/movie');

routerMovie.get('/', getMovies);
routerMovie.delete('/:id', validateId, deleteMovie);
routerMovie.post('/', validateCreateMovie, createMovie);

module.exports = routerMovie;
