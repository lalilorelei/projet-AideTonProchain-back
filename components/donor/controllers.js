// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Donor = require('./model');
const utilCtlr = require('../utils/controllers/index');

module.exports.register = utilCtlr.register(Donor);

module.exports.connexion = utilCtlr.connexion(Donor);

module.exports.profil = utilCtlr.profil(Donor);

module.exports.profil_update = utilCtlr.profil_update(Donor);
