const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const bodyParser = require('body-parser');
// const path = require('path');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('Невалидный url');
    }),
  }),
}), createUser);

app.use(auth);

app.use('/users', routesUsers);
app.use('/cards', routesCards);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден' });
});

// app.use(errorLogger); // подключаем логгер ошибок

app.use(errors);

// app.use((err, req, res, next) => {
//   res.send({ msg: err.message });
//   next(new Error('Ошибка авторизации'));
// });

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});
