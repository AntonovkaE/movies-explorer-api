// const { celebrate, Joi } = require('celebrate');
//
// const imgUrlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
//
// module.exports.validateSignIn = celebrate({
//   body: Joi.object()
//     .keys({
//       email: Joi.string()
//         .required()
//         .email(),
//       password: Joi.string()
//         .required(),
//     }),
// });
//
// module.exports.validateSignUp = celebrate({
//   body: Joi.object()
//     .keys({
//       email: Joi.string()
//         .required()
//         .email(),
//       password: Joi.string()
//         .required(),
//       name: Joi.string()
//         .min(2)
//         .max(30)
//         .default('Жак-Ив Кусто'),
//       avatar: Joi.string()
//         .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
//         .pattern(/^(ftp|http|https):\/\/[^ "]+$/),
//       about: Joi.string()
//         .min(2)
//         .max(30)
//         .default('Исследователь'),
//     }),
// });
//
// module.exports.validateId = celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().length(24).hex(),
//   }),
// });
//
// module.exports.validateCreateCard = celebrate({
//   body: Joi.object()
//     .keys({
//       name: Joi.string()
//         .required()
//         .min(2)
//         .max(30),
//       link: Joi.string()
//         .required()
//         .pattern(imgUrlRegExp),
//     }),
// });
//
// module.exports.validateUpdateUser = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30).required(),
//     about: Joi.string().min(2).max(30).required(),
//   }),
// });
//
// module.exports.validateUpdateAvatar = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string()
//       .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').pattern(/^(ftp|http|https):\/\/[^ "]+$/),
//   }),
// });
