// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Beneficiary = require('./model');
const utilCtlr = require('../utils_components/controllers/index');
const donationCtlr = require('../utils_components/controllers/donation');

module.exports.register = utilCtlr.register(Beneficiary);
module.exports.connexion = utilCtlr.connexion(Beneficiary);
module.exports.profil = utilCtlr.profil(Beneficiary);
module.exports.profil_update = utilCtlr.profil_update(Beneficiary);
module.exports.logout = utilCtlr.logout(Beneficiary);
module.exports.logoutAll = utilCtlr.logoutAll(Beneficiary);

module.exports.disable = utilCtlr.disable(Beneficiary);

module.exports.donation = donationCtlr.donation();
module.exports.donations = donationCtlr.donations();

module.exports.search = utilCtlr.search(Beneficiary);
