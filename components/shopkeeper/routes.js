const express = require('express');

const router = express.Router();

const shopkeeperCtlr = require('./controllers');

router.post('/register', shopkeeperCtlr.register);
router.post('/connexion', shopkeeperCtlr.connexion);
router.get('/profil/:id', shopkeeperCtlr.profil);
router.patch('/profil-update/:id', shopkeeperCtlr.profil_update);

router.post('/product/:shopkeeperId/', shopkeeperCtlr.product_creation);
router.get('/products/:shopkeeperId', shopkeeperCtlr.products);
router.get('/product/:shopkeeperId/:id', shopkeeperCtlr.product);
router.patch('/product-update/:shopkeeperId/:id', shopkeeperCtlr.product_update);

module.exports = router;
