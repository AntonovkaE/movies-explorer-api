require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
  errors,
} = require('celebrate');
const { validateSignIn, validateSignUp } = require('./utils/validation');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./utils/errors/NotFoundError');

const { errorHandler } = require('./utils/errors/errorHandler');
const limiter = require('./middlewares/limeter');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviedb');

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);
app.use('/users', require('./routes/user'));

app.use('/movies', require('./routes/movie'));

app.use('/', () => {
  throw new NotFoundError('Страница не найдена');
});
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
