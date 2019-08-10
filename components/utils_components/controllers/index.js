const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');

const config = require('config');

const jwtSecret = config.get('dev.jwtSecret');

/* eslint-disable global-require */
const Beneficiary = require('../../beneficiary/model');
const Donor = require('../../donor/model');
const Shopkeeper = require('../../shopkeeper/model');

module.exports.register = User => async (req, res) => {
  let email;
  let username;
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
      throw new Error('Email to be unique');
    }

    if (username) {
      throw new Error('Username to be unique');
    }

    const user = new User(req.body);

    if (req.file !== undefined) {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      user.avatar = buffer;
    }

    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports.connexion = () => async (req, res) => {
  let user;
  try {
    try {
      user = await Beneficiary.findByCredentials(req.body.login, req.body.password, Beneficiary);
    } catch (eb) {
      try {
        user = await Donor.findByCredentials(req.body.login, req.body.password, Donor);
      } catch (ed) {
        try {
          user = await Shopkeeper.findByCredentials(req.body.login, req.body.password, Shopkeeper);
        } catch (es) {
          throw new Error(es.message);
        }
      }
    }

    const token = await user.generateAuthToken();

    user.tokens.forEach((t, i) => {
      jwt.verify(t.token, jwtSecret, err => {
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
    return res.status(400).send({ error: e.message });
  }
};

module.exports.profil = () => async (req, res) => {
  try {
    // const { id } = req.params;
    // const user = await User.findOne({ _id: id });

    // if (!user) {
    //   res.status(404).send();
    // }

    res.send({ user: req.user });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

module.exports.profil_update = User => async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'firstname',
      'lastname',
      'password',
      'phone',
      'opening_hours',
      'localisation',
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      res.status(400).send({ error: 'Invalid updates' });
    }

    // const user = await User.findOne({ _id: '5d4293a7bb396f07a1aae6ee' });
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      res.status(404).send({ error: 'Invalid user' });
    }

    updates.forEach(update => (user[update] = req.body[update]));

    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `avatar-${Date.now()}${file.originalname}`);
  },
});

module.exports.upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    return cb(undefined, true);
  },
  storage,
});

module.exports.upload_avatar = User => async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      res.status(404).send({ error: 'Invalid user' });
    }

    if (req.file !== undefined) {
      user.avatar = `uploads/${req.file.filename}`;
    } else {
      res.status(404).send({ error: 'Invalid file' });
    }

    // if (req.file !== undefined) {
    //   const buffer = await sharp(req.file.buffer)
    //     .resize({ width: 250, height: 250 })
    //     .png()
    //     .toBuffer();

    //   user.avatar = buffer;
    // }

    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports.logout = User => async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const lengthBefore = user.tokens.length;

    user.tokens = user.tokens.filter(token => token.token !== req.token);

    if (user.tokens.length === lengthBefore) {
      res.status(400).send({ error: 'Invalid token' });
    }

    await user.save();
    res.send({ message: 'Deconnexion' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports.logoutAll = User => async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    user.tokens = [];

    await user.save();
    res.send({ user });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports.disable = User => async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user.id }, { active: false });

    if (!user) {
      res.status(404).send({ error: 'Invalid user' });
    }
    await user.save();
    return res.status(200).send({ message: `${user.username}'s profil disable` });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

module.exports.search = User => async (req, res) => {
  try {
    const { q } = req.query;
    let searchResult;

    await User.find({
      username: {
        $regex: q,
        $options: 'i',
      },
    })
      .then(result => {
        searchResult = result;
      })
      .catch(e => {
        console.log(e);
      });

    if (!searchResult) {
      res.status(404).send({ error: 'Invalid search' });
    }

    res.status(200).send({ result: searchResult });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
