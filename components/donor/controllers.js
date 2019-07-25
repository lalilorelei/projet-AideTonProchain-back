// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Donor = require('./model');

module.exports.register = async (req, res) => {
  const donor = new Donor(req.body);

  try {
    await donor.save();
    res.status(201).send({ donor });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.connexion = async (req, res) => {
  try {
    const donor = await Donor.findByCredentials(
      req.body.firstname,
      req.body.email,
      req.body.password,
    );
    res.send({ donor });
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.profil = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findOne({ _id: id });

    if (!donor) {
      res.status(404).send();
    }

    res.send(donor);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.profil_update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstname', 'lastname', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const { id } = req.params;
    const donor = await Donor.findOne({ _id: id });

    if (!donor) {
      res.status(404).send();
    }

    updates.forEach(update => (donor[update] = req.body[update]));
    await donor.save();
    res.send(donor);
  } catch (e) {
    res.status(400).send(e);
  }
};
