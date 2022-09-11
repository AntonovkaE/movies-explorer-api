const router = require('express')
  .Router();
const { validateId, validateCreateMovie } = require('../utils/validation');
const { getMovies, deleteMovie, createMovie } = require('../controllers/movie');

router.get('/', getMovies);
router.delete('/:id', validateId, deleteMovie);
router.post('/', validateCreateMovie, createMovie);

module.exports = router;
