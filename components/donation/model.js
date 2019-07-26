/* eslint-disable func-names */
const mongoose = require('mongoose');
// const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

// const utilModel = require('../utils/model/index');

const donnationSchema = mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
  },
  use_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  beneficiary_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Beneficiary', required: true },
  shopkeeper: [
    {
      type: {
        shopkeeper_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
        product_id: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper.products', required: true },
        ],
      },
      required: true,
    },
  ],
});

// donnationSchema.methods.toJSON = utilModel.toJSON('password');

// donnationSchema.pre('save', utilModel.preSave);

// donnationSchema.statics.findByCredentials = utilModel.findByCredentials;

donnationSchema.plugin(uniqueValidator);

const Donnation = mongoose.model('Donnation', donnationSchema);

module.exports = Donnation;
