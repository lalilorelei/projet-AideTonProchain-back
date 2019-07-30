/* eslint-disable func-names */
const mongoose = require('mongoose');
// const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const donnationSchema = mongoose.Schema({
  created_at: {
    type: Date,
    required: false,
  },
  use_at: {
    type: Date,
    required: false,
  },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: 'Beneficiary', required: true },
  shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
  // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
});

donnationSchema.pre('save', function(next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }

  next();
});

donnationSchema.plugin(uniqueValidator);

const Donnation = mongoose.model('Donnation', donnationSchema);

module.exports = Donnation;
