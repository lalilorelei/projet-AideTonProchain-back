/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const utilModel = require('../utils_components/model/index');

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
  username: {
    type: String,
    unique: true,
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
  avatar: { type: Buffer, required: true, default: '' },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  active: { type: Boolean, default: true },
});

donorSchema.methods.toJSON = utilModel.toJSON('password', 'tokens');

donorSchema.pre('save', utilModel.preSave);

donorSchema.statics.findByCredentials = utilModel.findByCredentials;

donorSchema.methods.generateAuthToken = utilModel.generateAuthToken('donor');

donorSchema.plugin(uniqueValidator);

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
