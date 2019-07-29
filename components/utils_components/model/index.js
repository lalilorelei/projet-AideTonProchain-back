/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config');

const jwtSecret = config.get('dev.jwtSecret');

module.exports.toJSON = function() {
  const argumentsArray = [...arguments];
  return function() {
    const obj = this.toObject();

    argumentsArray.forEach(arg => delete obj[arg]);

    return obj;
  };
};

// Hash the plain text password before saving
module.exports.preSave = async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  if (!this.created_at) {
    this.created_at = new Date();
  }

  next();
};

module.exports.findByCredentials = async (username = '', email = '', password, User) => {
  let user;
  // eslint-disable-next-line global-require
  const Beneficiary = require('../../beneficiary/model');
  if (User === Beneficiary) {
    user = await User.findOne({ username });
  } else {
    user = await User.findOne({ $or: [{ username }, { email }] });
  }

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

module.exports.generateAuthToken = role =>
  // eslint-disable-next-line implicit-arrow-linebreak
  async function() {
    const token = jwt.sign({ _id: this._id.toString(), role }, jwtSecret, {
      expiresIn: '1m',
    });

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  };
