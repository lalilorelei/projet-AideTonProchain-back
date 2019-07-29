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
  products: [
    {
      name: { type: String, required: true, unique: true },
      price: { type: Number, required: true },
      available: { type: Boolean, required: true },
      category: { type: String, required: true },
    },
  ],
  donnations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donnation' }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

shopkeeperSchema.methods.toJSON = utilModel.toJSON('password');

shopkeeperSchema.pre('save', utilModel.preSave);

shopkeeperSchema.statics.findByCredentials = utilModel.findByCredentials;

shopkeeperSchema.methods.generateAuthToken = utilModel.generateAuthToken('shopkeeper');

shopkeeperSchema.plugin(uniqueValidator);

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);

module.exports = Shopkeeper;
