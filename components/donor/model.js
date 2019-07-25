/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// const uniqueValidator = require('mongoose-unique-validator');

const donorSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  donnations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
});

donorSchema.methods.toJSON = function() {
  const donorObject = this.toObject();

  delete donorObject.password;

  return donorObject;
};

// Hash the plain text password before saving
donorSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  if (!this.created_at) {
    this.created_at = new Date();
  }

  next();
});

donorSchema.statics.findByCredentials = async (firstname = '', email = '', password) => {
  // eslint-disable-next-line no-use-before-define
  const donor = await Donor.findOne({ $or: [{ firstname }, { email }, { password }] });

  if (!donor) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, donor.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return donor;
};

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
