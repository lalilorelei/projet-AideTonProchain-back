/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const utilModel = require('../utils_components/model/index');

const shopkeeperSchema = mongoose.Schema({
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
  shopkeeper_name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  phone: { type: String, required: false },
  opening_hours: {
    lundi: {
      morning_open: Number,
      morning_close: Number,
      afternoon_open: Number,
      afternoon_close: Number,
    },
    mardi: {
      morning_open: Number,
      morning_close: Number,
      afternoon_open: Number,
      afternoon_close: Number,
    },
    mercredi: {
      morning_open: Number,
      morning_close: Number,
      afternoon_open: Number,
      afternoon_close: Number,
    },
    jeudi: {
      morning_open: Number,
      morning_close: Number,
      afternoon_open: Number,
      afternoon_close: Number,
    },
    vendredi: {
      morning_open: Number,
      morning_close: Number,
      afternoon_open: Number,
      afternoon_close: Number,
    },
    samedi: {
      morning_open: Number,
      morning_close: Number,
      afternoon_open: Number,
      afternoon_close: Number,
    },
    dimanche: {
      morning_open: Number,
      morning_close: Number,
      afternoon_open: Number,
      afternoon_close: Number,
    },
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  description: { type: String, required: false },
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
    required: true,
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

shopkeeperSchema.methods.toJSON = utilModel.toJSON('password', 'tokens');

shopkeeperSchema.pre('save', utilModel.preSave);

shopkeeperSchema.statics.findByCredentials = utilModel.findByCredentials;

shopkeeperSchema.methods.generateAuthToken = utilModel.generateAuthToken('shopkeeper');

shopkeeperSchema.plugin(uniqueValidator);

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);

module.exports = Shopkeeper;
