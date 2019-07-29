/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const utilModel = require('../utils_components/model/index');

const beneficiarySchema = mongoose.Schema({
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
    required: false,
    trim: true,
    lowercase: true,
    validate(value) {
      if (value !== '') {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    default: '',
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
  localisation: {
    type: {
      address: String,
      latitude: Number,
      longitude: Number,
    },
    default: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
  },
  donnations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donnation', default: [] }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

beneficiarySchema.methods.toJSON = utilModel.toJSON('password');

beneficiarySchema.pre('save', utilModel.preSave);

beneficiarySchema.statics.findByCredentials = utilModel.findByCredentials;

beneficiarySchema.methods.generateAuthToken = utilModel.generateAuthToken('beneficiary');

beneficiarySchema.plugin(uniqueValidator);

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

module.exports = Beneficiary;
