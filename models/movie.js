const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Некорректная ссылка.',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Некорректная ссылка.',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Некорректная ссылка.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: [2, 'It is must be 2 symbols min'],
    maxlength: [30, 'It is must be 30 symbols max'],
  },
  nameRU: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },

  // likes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   default: [],
  // }],
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
});

module.exports = mongoose.model('movie', movieSchema);
