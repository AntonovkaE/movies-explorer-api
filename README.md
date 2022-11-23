# movies-explorer-api
Дипломный проект в курсе Яндекс практикум

Публичный IPv4 158.160.6.146
http://api.movie.antonovskaya.nomoredomains.sbs


[Бэкенд часть на сервере](http://api.movie.antonovskaya.nomoredomains.sbs)

[Фронтенд часть](https://movie.antonovskaya.nomoredomains.sbs)


## Технологии:

- NodeJS
- Express
- MongoDB
- Nginx
- ESlint

---

##Директории

/routes — папка с файлами роутера
/controllers — папка с файлами контроллеров пользователя и карточки
/models — папка с файлами описания схем пользователя и карточки

---

## Запуск проекта

npm run start — запускает сервер
npm run dev — запускает сервер с hot-reload

## Роуты 
- GET /movies   возвращает все сохранённые текущим  пользователем фильмы
- POST /movies   создаёт фильм с переданными в теле данными
- DELETE /movies/_id  удаляет сохранённый фильм по id
- POST /signup  создаёт пользователя с переданными в теле email, password и name
- POST /signin проверяет переданные в теле почту и пароль и возвращает JWT
