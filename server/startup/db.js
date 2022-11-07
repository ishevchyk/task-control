const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = function () {
  mongoose.connect(`mongodb+srv://${dotenv.parsed.DB_NAME}:${dotenv.parsed.DB_PASSWORD}@taskcontrol.2kdws67.mongodb.net/task-control`)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))
}
