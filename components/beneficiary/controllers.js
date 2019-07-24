// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Beneficiary = require('./model');

module.exports.profil = (req, res, next) => {
  res.status(200).json({
    message: 'Get Success!',
  });
};

module.exports.register = (req, res, next) => {
  res.status(201).json({
    message: 'beneficiary added successfully!',
  });
};
