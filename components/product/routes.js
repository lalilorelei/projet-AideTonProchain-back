const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const productCtlr = require('./controllers');
const Shopkeeper = require('./model');

router.post('/product/', auth(Shopkeeper), productCtlr.product_creation);
router.get('/products/', auth(Shopkeeper), productCtlr.products);
router.get('/product/:id', auth(Shopkeeper), productCtlr.product);
router.patch('/product-update/:id', auth(Shopkeeper), productCtlr.product_update);

module.exports = router;
