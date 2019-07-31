// const mongoose = require('mongoose');

const Product = require('./model');
const Shopkeeper = require('../shopkeeper/model');

module.exports.product_creation = async (req, res) => {
  try {
    const shop = await Shopkeeper.findById({ _id: req.user.id });
    if (!shop) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    const product = new Product(req.body);
    product.shopkeeper = shop._id;
    await product.save();

    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.product = async (req, res) => {
  try {
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    const { id } = req.params;
    const product = await Product.findOne({ _id: id, shopkeeper: req.user.id });
    if (!product) {
      res.status(404).send({ error: 'Invalid product' });
    }

    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.products = async (req, res) => {
  try {
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    const products = await Product.find({ shopkeeper: req.user.id });
    if (!products) {
      res.status(404).send();
    }

    res.send(products);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.product_update = async (req, res) => {
  try {
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    const { id } = req.params;
    const updates = Object.keys(req.body);

    const product = await Product.findOne({ _id: id, shopkeeper: req.user.id });
    if (!product) {
      res.status(404).send({ error: 'Invalid product' });
    }

    updates.forEach(update => (product[update] = req.body[update]));
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.delete = async (req, res) => {
  try {
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    if (!product) {
      res.status(404).send({ error: 'Invalid product' });
    }

    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
};
