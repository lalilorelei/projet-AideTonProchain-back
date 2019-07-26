// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Beneficiary = require('./model');
const utilCtlr = require('../utils/controllers/index');

module.exports.register = utilCtlr.register(Beneficiary);

module.exports.connexion = utilCtlr.connexion(Beneficiary);

module.exports.profil = utilCtlr.profil(Beneficiary);

module.exports.profil_update = utilCtlr.profil_update(Beneficiary);
