const express = require('express');
const app = express();


require('./startup/db')();
require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/error')(app)


const port = process.env.PORT || 8080;
const start = async () => {
  try {
    app.listen(port, () => console.log(`Listening on ${port}`));
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`)
  }
};

start();

