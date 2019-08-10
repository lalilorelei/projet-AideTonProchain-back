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

module.exports.upload_avatar = utilCtlr.upload_avatar(Beneficiary);

module.exports.beneficiaryList = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find({});

    if (!beneficiaries) {
      return res.status(404).send({ error: 'No shopkeeper' });
    }

    return res.status(200).send({ beneficiaries });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

module.exports.beneficiarySingle = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findOne({ _id: req.params.id });

    if (!beneficiary) {
      return res.status(404).send({ error: 'Invalid beneficiary' });
    }

    return res.status(200).send({ beneficiary });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};
