const Shopkeeper = require('./model');
const utilCtlr = require('../utils_components/controllers/index');
const donationCtlr = require('../utils_components/controllers/donation');

module.exports.register = utilCtlr.register(Shopkeeper);
module.exports.connexion = utilCtlr.connexion(Shopkeeper);
module.exports.profil = utilCtlr.profil(Shopkeeper);
module.exports.profil_update = utilCtlr.profil_update(Shopkeeper);
module.exports.logout = utilCtlr.logout(Shopkeeper);
module.exports.logoutAll = utilCtlr.logoutAll(Shopkeeper);

module.exports.disable = utilCtlr.disable(Shopkeeper);

module.exports.donation = donationCtlr.donation();
module.exports.donations = donationCtlr.donations();
module.exports.do_donation = donationCtlr.do_donation(Shopkeeper);

module.exports.donation_used = donationCtlr.donation_used(Shopkeeper);

module.exports.search = utilCtlr.search(Shopkeeper);

module.exports.shopkeeperList = async (req, res) => {
  try {
    const shopkeepers = await Shopkeeper.find({});

    if (!shopkeepers) {
      return res.status(404).send({ error: 'No shopkeeper' });
    }

    return res.status(200).send({ shopkeepers });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

module.exports.shopkeeperSingle = async (req, res) => {
  try {
    const shopkeeper = await Shopkeeper.findOne({ _id: req.params.id });

    if (!shopkeeper) {
      return res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    return res.status(200).send({ shopkeeper });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};
