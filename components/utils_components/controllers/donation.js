const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const config = require('config');

const jwtSecret = config.get('dev.jwtSecret');

const Donation = require('../../donation/model');

module.exports.donation = () => async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret);
    const { role } = decoded;

    const { id } = req.params;

    const donation = await Donation.findOne({ _id: id, [role]: req.user.id })
      .populate('donor', 'username')
      .populate({ path: 'shopkeeper', select: ['shopkeeper_name', 'localisation'] })
      .populate('products');

    if (!donation) {
      return res.status(404).send({ error: 'Invalid donation' });
    }

    // let beneficiaryUsername;

    // if (mongoose.Types.ObjectId.isValid(donation.beneficiary)) {
    //   // eslint-disable-next-line global-require
    //   const Beneficiary = require('../../beneficiary/model');
    //   const beneficiary = await Beneficiary.findOne({
    //     _id: donation.beneficiary,
    //   });
    //   beneficiaryUsername = beneficiary.username;
    // } else {
    //   beneficiaryUsername = donation.beneficiary;
    // }

    // _id - date - beneficiary_name || bneficiary de la table de donation - donor_name
    // shopkeeper_name - shopkeeper_id - shopkeeper_localisation - products

    return res.send({
      donation,
    });
  } catch (e) {
    return res.status(400).send({ message: e });
  }
};

// eslint-disable-next-line consistent-return
module.exports.donations = () => async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret);
    const { role } = decoded;

    let donations;

    await Donation.find({ [role]: req.user.id })
      .populate('donor', 'username')
      .populate({ path: 'shopkeeper', select: ['shopkeeper_name', 'localisation'] })
      .populate('products')
      .then(result => {
        donations = result;
      })
      .catch(e => {
        console.log(e);
      });

    if (!donations) {
      return res.status(404).send({ error: 'Invalid donation' });
    }

    // eslint-disable-next-line consistent-return
    const du = await donations.map(donation => {
      if (mongoose.Types.ObjectId.isValid(donation.beneficiary)) {
        // eslint-disable-next-line global-require
        const Beneficiary = require('../../beneficiary/model');
        const ben = Beneficiary.findOne({
          _id: donation.beneficiary,
        });
        donation.beneficiaryUsername = ben.username;
        // .then(() => res.send({ donations }));
      } else {
        donation.beneficiaryUsername = donation.beneficiary;
      }
      return donation;
      // return res.send({
      //   donations,
      // });
    });

    return res.status(200).send({
      donations: du,
    });
  } catch (e) {
    return res.status(400).send({ message: e });
  }
};

module.exports.do_donation = User => async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret);
    const { role } = decoded;

    const donor = await User.findById({ _id: req.user.id });

    if (!donor) {
      return res.status(400).send('Invalid donor');
    }

    const don = new Donation(req.body);
    await don.save();

    const donation = await Donation.findOne({ _id: don.id, [role]: req.user.id })
      .populate('donor', 'username')
      .populate({ path: 'shopkeeper', select: ['shopkeeper_name', 'localisation'] })
      .populate('products');
    if (!donation) {
      return res.status(404).send({ error: 'Invalid donation' });
    }

    // let beneficiaryUsername;

    if (mongoose.Types.ObjectId.isValid(donation.beneficiary)) {
      // eslint-disable-next-line global-require
      const Beneficiary = require('../../beneficiary/model');
      const beneficiary = await Beneficiary.findOne({
        _id: donation.beneficiary,
      });
      donation.beneficiaryUsername = beneficiary.username;
    } else {
      donation.beneficiaryUsername = donation.beneficiary;
    }

    return res.send({
      donation,
    });
  } catch (e) {
    return res.status(400).send({ message: e });
  }
};

module.exports.donation_used = () => async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret);
    const { role } = decoded;

    const { id } = req.params;

    const donation = await Donation.findOneAndUpdate(
      { _id: id, [role]: req.user.id },
      { used_at: new Date() },
    );

    if (!donation) {
      return res.status(404).send({ error: 'Invalid donation' });
    }

    await donation.save();
    return res.send({ donation });
  } catch (e) {
    return res.status(400).send({ message: e });
  }
};
