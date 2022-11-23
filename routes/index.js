const router = require('express')
  .Router();
const auth = require('../middlewares/auth');
const routerMovie = require('./movie');
const routerUser = require('./user');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { notFoundMessage } = require('../utils/constances');
const { validateSignIn, validateSignUp } = require('../utils/validation');
const { login, createUser } = require('../controllers/user');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.use('/movies', routerMovie);
router.use('/users', routerUser);
router.use('/', () => {
  throw new NotFoundError(notFoundMessage);
});

module.exports = router;
