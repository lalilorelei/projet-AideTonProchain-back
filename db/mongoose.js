const mongoose = require('mongoose');

const config = require('config');

const mongodb = config.get('Customer.dbConfig');
mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch(error => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
