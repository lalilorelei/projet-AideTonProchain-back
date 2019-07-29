const mongoose = require('mongoose');

const config = require('config');

const mongodb = config.get('dev.dbConfig');

mongoose
  .connect(`${mongodb.host}:${mongodb.port}/${mongodb.dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  // eslint-disable-next-line arrow-parens
  .catch(error => {
    console.log('Unable to connect to MongoDB');
    console.error(error);
  });
