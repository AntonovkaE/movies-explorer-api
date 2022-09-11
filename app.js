const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { NotFoundError } = require('./utils/errors/NotFoundError');
const { validateSignIn, validateSignUp } = require('./utils/validation');
const { login, createUser } = require('./controllers/user')


app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);


app.use('/users', require('./routes/user'));

app.use('/movies', require('./routes/movie'));

// app.use('/', () => {
//   throw new NotFoundError('Страница не найдена');
// });

app.listen(PORT)
