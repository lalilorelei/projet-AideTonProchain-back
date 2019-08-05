const jwt = require('jsonwebtoken');

const config = require('config');

const jwtSecret = config.get('dev.jwtSecret');

const auth = User => async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error('Please authenticate.');
    }

    if (user.active === false) {
      throw new Error('Profil disable, please contact the administrator.');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

module.exports = auth;
