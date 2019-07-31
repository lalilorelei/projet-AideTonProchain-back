const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./db/mongoose');

const adminRouter = require('./components/admin/routes');
const beneficiaryRouter = require('./components/beneficiary/routes');
const donorRouter = require('./components/donor/routes');
const shopkeeperRouter = require('./components/shopkeeper/routes');
const connexionRouter = require('./components/connexion/routes');
const productRouter = require('./components/product/routes');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/api/admin', adminRouter);
app.use('/api/beneficiary', beneficiaryRouter);
app.use('/api/donor', donorRouter);
app.use('/api/shopkeeper', shopkeeperRouter);
app.use('/api/connexion', connexionRouter);
app.use('/api/product', productRouter);

module.exports = app;
