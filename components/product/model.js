/* eslint-disable func-names */
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const donationSchema = mongoose.Schema({
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  product: {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true },
    category: { type: String, required: true },
  },
  shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
});

donationSchema.plugin(uniqueValidator);

const Product = mongoose.model('Donation', donationSchema);

module.exports = Product;
