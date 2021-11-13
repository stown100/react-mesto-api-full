const jwt = require('jsonwebtoken');
const AuthorizedError = require('../errors/AuthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new AuthorizedError('Необходима авторизация'));
  }
  req.user = payload; // записывю пейлоуд в объект запроса
  next();
};
