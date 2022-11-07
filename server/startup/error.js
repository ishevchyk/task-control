const {errorHandler} = require('../controllers/errorHandler')
module.exports = function (app) {
  app.use(errorHandler)
}
