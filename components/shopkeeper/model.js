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
  phone: { type: Number, required: false, default: 0 },
  opening_hours: {
    monday: {
      morning_open: { type: Number, required: false, default: 0 },
      morning_close: { type: Number, required: false, default: 0 },
      afternoon_open: { type: Number, required: false, default: 0 },
      afternoon_close: { type: Number, required: false, default: 0 },
    },
    tuesday: {
      morning_open: { type: Number, required: false, default: 0 },
      morning_close: { type: Number, required: false, default: 0 },
      afternoon_open: { type: Number, required: false, default: 0 },
      afternoon_close: { type: Number, required: false, default: 0 },
    },
    thursday: {
      morning_open: { type: Number, required: false, default: 0 },
      morning_close: { type: Number, required: false, default: 0 },
      afternoon_open: { type: Number, required: false, default: 0 },
      afternoon_close: { type: Number, required: false, default: 0 },
    },
    wednesday: {
      morning_open: { type: Number, required: false, default: 0 },
      morning_close: { type: Number, required: false, default: 0 },
      afternoon_open: { type: Number, required: false, default: 0 },
      afternoon_close: { type: Number, required: false, default: 0 },
    },
    friday: {
      morning_open: { type: Number, required: false, default: 0 },
      morning_close: { type: Number, required: false, default: 0 },
      afternoon_open: { type: Number, required: false, default: 0 },
      afternoon_close: { type: Number, required: false, default: 0 },
    },
    saturday: {
      morning_open: { type: Number, required: false, default: 0 },
      morning_close: { type: Number, required: false, default: 0 },
      afternoon_open: { type: Number, required: false, default: 0 },
      afternoon_close: { type: Number, required: false, default: 0 },
    },
    sunday: {
      morning_open: { type: Number, required: false, default: 0 },
      morning_close: { type: Number, required: false, default: 0 },
      afternoon_open: { type: Number, required: false, default: 0 },
      afternoon_close: { type: Number, required: false, default: 0 },
    },
  },
  categories: [
    {
      type: String,
      required: false,
      default: [],
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
  avatar: { type: Buffer, required: false },
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
  distance: { type: Number, required: false, default: 0 },
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
