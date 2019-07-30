const jwt = require('jsonwebtoken');

const config = require('config');

const jwtSecret = config.get('dev.jwtSecret');

const Donation = require('./model');
const Donor = require('../donor/model');

module.exports.donation = async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret);
    const { role } = decoded;

    const { id } = req.params;
    const donation = await Donation.findOne({ _id: id }).populate(role);
    if (!donation) {
      res.status(404).send();
    }

    res.send(donation);
  } catch (e) {
    res.status(400).send({ message: e });
  }
};

module.exports.donations = async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret);
    const { role } = decoded;

    const donations = await Donation.find({ [role]: req.user.id });
    if (!donations) {
      res.status(404).send();
    }

    res.send(donations);
  } catch (e) {
    res.status(400).send({ message: e });
  }
};

module.exports.do_donation = async (req, res) => {
  try {
    const donor = await Donor.findById({ _id: req.user.id });

    if (!donor) {
      res.status(400).send('Donor not found');
    }

    const donation = new Donation();
    donation.donor = req.body.donor;
    donation.beneficiary = req.body.beneficiary;
    donation.shopkeeper = req.body.shopkeeper;
    // eslint-disable-next-line arrow-parens
    req.body.products.forEach(product => {
      donation.products.push(product);
    });
    await donation.save();
    res.status(201).send({ donation });

    // const donation = new Donation(req.body);
    // await donation.save();
    // res.status(201).send({ donation });
  } catch (e) {
    res.status(400).send({ message: e });
  }
};
