// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Donor = require('./model');
const utilCtlr = require('../utils_components/controllers/index');

module.exports.register = utilCtlr.register(Donor);

module.exports.connexion = utilCtlr.connexion(Donor);

module.exports.profil = utilCtlr.profil();

module.exports.profil_update = utilCtlr.profil_update(Donor);

module.exports.logout = utilCtlr.logout();

module.exports.logoutAll = utilCtlr.logoutAll();
