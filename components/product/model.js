/* eslint-disable func-names */
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true, default: true },
  description: {
    type: String,
    required: true,
    default: '',
  },
  shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
});

productSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
