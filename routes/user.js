const router = require('express').Router();
const { validateUpdateUser } = require('../utils/validation');
const { getUser, updateUser } = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
