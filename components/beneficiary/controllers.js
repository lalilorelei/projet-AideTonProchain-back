const geolib = require('geolib');

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

module.exports.beneficiaryDistance = async (req, res) => {
  try {
    const { latitude, longitude, km } = req.body;
    const beneficiaries = await Beneficiary.find({});

    if (!beneficiaries) {
      return res.status(404).send({ error: 'No shopkeeper' });
    }

    const beneficiariesLocation = beneficiaries.filter(
      beneficiary => beneficiary.location.latitude !== 0,
    );

    const beneficiariesNoLocation = beneficiaries.filter(
      beneficiary => beneficiary.location.latitude === 0,
    );

    const thirty = beneficiariesLocation.filter(beneficiary => {
      const distance = geolib.getDistance(
        { latitude, longitude },
        {
          latitude: beneficiary.localisation.latitude,
          longitude: beneficiary.localisation.longitude,
        },
      );
      beneficiary.distance = Number((distance / 1000).toFixed(1));
      console.log(beneficiary.distance, distance);
      return beneficiary.distance < km;
    });

    if (thirty) {
      thirty.sort((a, b) => (a.distance > b.distance ? 1 : -1));
    }

    return res.status(200).send({ beneficiariesDistance: thirty, beneficiariesNoLocation });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};
