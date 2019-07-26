/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */

const bcrypt = require('bcryptjs');

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
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};
