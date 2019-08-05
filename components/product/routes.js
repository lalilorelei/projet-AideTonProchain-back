const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const productCtlr = require('./controllers');
const Shopkeeper = require('../shopkeeper/model');

router.get('/:shopkeeperId/:id', productCtlr.product);
router.get('/:shopkeeperId', productCtlr.products);

router.post('/:shopkeeperId', auth(Shopkeeper), productCtlr.product_creation);
router.patch('/update/:id', auth(Shopkeeper), productCtlr.product_update);
router.delete('/delete/:id', auth(Shopkeeper), productCtlr.delete);

module.exports = router;
