/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

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

module.exports.findByCredentials = async (login, password, User) => {
  const data = {
    username: '',
    email: '',
  };
  if (validator.isEmail(login)) {
    data.email = login;
  } else {
    data.username = login;
  }
  let user;
  // eslint-disable-next-line global-require
  const Beneficiary = require('../../beneficiary/model');
  if (User === Beneficiary) {
    user = await Beneficiary.findOne({ username: data.username });
  } else {
    user = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] });
  }

  if (!user) {
    throw new Error('User not found');
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
      expiresIn: '1d',
    });

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  };
