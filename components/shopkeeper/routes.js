const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const shopkeeperCtlr = require('./controllers');
const Shopkeeper = require('./model');

router.post('/register', shopkeeperCtlr.register);
router.post('/connexion', shopkeeperCtlr.connexion);
router.get('/profil/', auth(Shopkeeper), shopkeeperCtlr.profil);
router.patch('/profil-update/:id', auth(Shopkeeper), shopkeeperCtlr.profil_update);
router.post('/logout', auth(Shopkeeper), shopkeeperCtlr.logout);
router.post('/logoutAll', auth(Shopkeeper), shopkeeperCtlr.logoutAll);

router.post('/product/:shopkeeperId/', shopkeeperCtlr.product_creation);
router.get('/products/:shopkeeperId', shopkeeperCtlr.products);
router.get('/product/:shopkeeperId/:id', shopkeeperCtlr.product);
router.patch('/product-update/:shopkeeperId/:id', shopkeeperCtlr.product_update);

module.exports = router;
