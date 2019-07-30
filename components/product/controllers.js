const mongoose = require('mongoose');

const Shopkeeper = require('./model');

module.exports.product_creation = async (req, res) => {
  try {
    // const { shopkeeperId } = req.params;
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    await Shopkeeper.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { products: { _id: mongoose.Types.ObjectId(), ...req.body } } },
    );

    const product = await Shopkeeper.aggregate([
      { $project: { last: { $arrayElemAt: ['$products', -1] } } },
    ]);

    res.status(201).send(product);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.products = async (req, res) => {
  try {
    // const { shopkeeperId } = req.params;
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send();
    }

    res.send(shopkeeper.products);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.product = async (req, res) => {
  try {
    const { id } = req.params;
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    const index = shopkeeper.products.findIndex(el => String(el._id) === id);
    // const product = await Shopkeeper.findById({ _id: shopkeeperId, products: id });

    if (index === -1) {
      res.status(404).send({ error: 'Invalid product' });
    }

    res.send(shopkeeper.products[index]);
  } catch (e) {
    res.status(400).send();
  }
};

module.exports.product_update = async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  try {
    const shopkeeper = await Shopkeeper.findById({ _id: req.user.id });
    if (!shopkeeper) {
      res.status(404).send({ error: 'Invalid shopkeeper' });
    }

    const index = shopkeeper.products.findIndex(el => String(el._id) === id);

    if (index === -1) {
      res.status(404).send({ error: 'Invalid product' });
    }

    updates.forEach(update => (shopkeeper.products[index][update] = req.body[update]));
    await shopkeeper.save();

    res.send(shopkeeper.products[index]);
  } catch (e) {
    res.status(400).send();
  }
};
