const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({
    "message" : "Please, provide authorization header."
  })

  const [, token] = authorization.split(' ');
  if(!token) return res.status(401).send('Access denied. No token provided');

  try{
    req.user = jwt.verify(token, dotenv.parsed.JWT_SECRET_KEY);
    next()
  } catch (e) {
    res.status(400).send('Invalid token');
  }
}

module.exports = authMiddleware
