const routerUsers = require('express').Router();
const { validateUpdateUser } = require('../utils/validation');
const { getUser, updateUser } = require('../controllers/user');

routerUsers.get('/me', getUser);
routerUsers.patch('/me', validateUpdateUser, updateUser);

module.exports = routerUsers;
