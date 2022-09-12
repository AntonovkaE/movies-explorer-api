const { celebrate, Joi } = require('celebrate');

const imgUrlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

module.exports.validateSignIn = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .min(2)
        .max(30)
        .default('Ella'),
    }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      nameEN: Joi.string()
        .required()
        .min(2)
        .max(30),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(imgUrlRegExp),
      trailerLink: Joi.string()
        .required()
        .pattern(imgUrlRegExp),
      thumbnail: Joi.string()
        .required()
        .pattern(imgUrlRegExp),
      owner: Joi.string().length(24).hex(),
      nameRU: Joi.string(),
    }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .required()
      .email(),
  }),
});
