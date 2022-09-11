require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { NotFoundError } = require('./utils/errors/NotFoundError');
const { validateSignIn, validateSignUp } = require('./utils/validation');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  errors,
} = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviedb');

app.use(requestLogger);

app.post('/signin', validateSignIn, login);


app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/users', require('./routes/user'));

app.use('/movies', require('./routes/movie'));


// app.use('/', () => {
//   throw new NotFoundError('Страница не найдена');
// });

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.listen(PORT);
