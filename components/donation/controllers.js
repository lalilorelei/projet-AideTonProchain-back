// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Shopkeeper = require('./model');
const utilCtlr = require('../utils/controllers/index');

module.exports.register = utilCtlr.register(Shopkeeper);

module.exports.connexion = utilCtlr.connexion(Shopkeeper);

module.exports.profil = utilCtlr.profil(Shopkeeper);

module.exports.profil_update = utilCtlr.profil_update(Shopkeeper);
