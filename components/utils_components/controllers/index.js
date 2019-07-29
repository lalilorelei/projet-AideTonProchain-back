const jwt = require('jsonwebtoken');

const config = require('config');

const jwtSecret = config.get('dev.jwtSecret');

/* eslint-disable global-require */
const Beneficiary = require('../../beneficiary/model');
const Donor = require('../../donor/model');
const Shopkeeper = require('../../shopkeeper/model');

module.exports.register = User => async (req, res) => {
  let email;
  let username;
  let error;
  try {
    email = await Beneficiary.findOne({ email: req.body.email });

    if (User !== Beneficiary) {
      username = await Beneficiary.findOne({ username: req.body.username });
    }

    if (User !== Donor) {
      if (!email) {
        email = await Donor.findOne({ email: req.body.email });
      }
      if (!username) {
        username = await Donor.findOne({ username: req.body.username });
      }
    }

    if (User !== Shopkeeper) {
      if (!email) {
        email = await Shopkeeper.findOne({ email: req.body.email });
      }
      if (!username) {
        username = await Shopkeeper.findOne({ username: req.body.username });
      }
    }

    if (email) {
      error = 'Email to be unique';
    }

    if (username) {
      error = 'Username to be unique';
    }

    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ message: error || e });
  }
};

module.exports.connexion = () => async (req, res) => {
  let user;
  let error;
  try {
    try {
      user = await Beneficiary.findByCredentials(
        req.body.username,
        req.body.email,
        req.body.password,
        Beneficiary,
      );
    } catch (eb) {
      try {
        user = await Donor.findByCredentials(
          req.body.username,
          req.body.email,
          req.body.password,
          Donor,
        );
      } catch (ed) {
        try {
          user = await Shopkeeper.findByCredentials(
            req.body.username,
            req.body.email,
            req.body.password,
            Shopkeeper,
          );
        } catch (es) {
          error = es.message;
        }
      }
    }

    const token = await user.generateAuthToken();

    user.tokens.forEach((t, i) => {
      jwt.verify(t.token, jwtSecret, (err, decoded) => {
        console.log(decoded);
        if (err) {
          if (err.message) {
            user.tokens.splice(i, 1);
            user.save();
          }
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
        }
      });
    });

    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(400).send({ message: error || e });
  }
};

module.exports.profil = () => async (req, res) => {
  try {
    // const { id } = req.params;
    // const user = await User.findOne({ _id: id });

    // if (!user) {
    //   res.status(404).send();
    // }

    res.send(req.user);
  } catch (e) {
    res.status(400).send({ message: e });
  }
};

module.exports.profil_update = User => async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstname', 'lastname', 'username', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // const { id } = req.params;
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      res.status(404).send();
    }

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send({ message: e });
  }
};

module.exports.logout = () => async (req, res) => {
  const lengthBefore = req.user.tokens.length;
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);

    if (req.user.tokens.length === lengthBefore) {
      res.status(400).send();
    }

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.logoutAll = () => async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
