const Shopkeeper = require('./model');
const utilCtlr = require('../utils_components/controllers/index');
const donationCtlr = require('../utils_components/controllers/donation');

module.exports.register = utilCtlr.register(Shopkeeper);

module.exports.connexion = utilCtlr.connexion(Shopkeeper);

module.exports.profil = utilCtlr.profil(Shopkeeper);

module.exports.profil_update = utilCtlr.profil_update(Shopkeeper);

module.exports.logout = utilCtlr.logout();

module.exports.logoutAll = utilCtlr.logoutAll();

module.exports.donation = donationCtlr.donation();
module.exports.donations = donationCtlr.donations();
module.exports.do_donation = donationCtlr.do_donation(Shopkeeper);
