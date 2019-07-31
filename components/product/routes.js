const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const productCtlr = require('./controllers');
const Shopkeeper = require('../shopkeeper/model');

router.post('/', auth(Shopkeeper), productCtlr.product_creation);
router.get('/:id', auth(Shopkeeper), productCtlr.product);
router.get('/', auth(Shopkeeper), productCtlr.products);
router.patch('/update/:id', auth(Shopkeeper), productCtlr.product_update);
router.delete('/delete/:id', auth(Shopkeeper), productCtlr.delete);

module.exports = router;
