const localBase = 'mongodb://localhost:27017/localMoviesdb';
const notFoundMessage = 'Страница не найдена';
const badRequestMessage = 'Переданы некорректные данные';
const badRequestFilmMessage = 'Некорректные данные при создании фильма';
const notFoundFilmMessage = 'Фильма с таким айди не существует';
const notFoundUserMessage = 'Нет пользователя с таким id';
const badRequestUserMessage = 'Некорректные данные пользователя';
const conflictEmailMessage = 'Пользователь с таким email существует';
const wrongUserDataMessage = 'Неправильные почта или пароль';
const unauthorizedMessage = 'Необходима авторизация';
const forbiddenMessage = 'Нельзя удалять чужую карточку';

module.exports = {
  localBase,
  notFoundMessage,
  badRequestMessage,
  badRequestFilmMessage,
  notFoundFilmMessage,
  notFoundUserMessage,
  badRequestUserMessage,
  conflictEmailMessage,
  wrongUserDataMessage,
  unauthorizedMessage,
  forbiddenMessage,
};
