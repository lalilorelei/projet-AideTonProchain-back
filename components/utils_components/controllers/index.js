const jwt = require('jsonwebtoken');

const config = require('config');

const jwtSecret = config.get('dev.jwtSecret');

module.exports.register = User => async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.connexion = User => async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.email,
      req.body.password,
      User,
    );
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

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
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
    res.status(400).send();
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
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(404).send();
    }

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
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
