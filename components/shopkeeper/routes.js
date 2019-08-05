const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const shopkeeperCtlr = require('./controllers');
const Shopkeeper = require('./model');

router.post('/register', shopkeeperCtlr.register);
router.post('/connexion', shopkeeperCtlr.connexion);
router.get('/profil/', auth(Shopkeeper), shopkeeperCtlr.profil);
router.patch('/profil-update/', auth(Shopkeeper), shopkeeperCtlr.profil_update);
router.post('/logout', auth(Shopkeeper), shopkeeperCtlr.logout);
router.post('/logoutAll', auth(Shopkeeper), shopkeeperCtlr.logoutAll);

router.get('/disable', auth(Shopkeeper), shopkeeperCtlr.disable);

router.get('/donations/:id', auth(Shopkeeper), shopkeeperCtlr.donation);
router.get('/donations', auth(Shopkeeper), shopkeeperCtlr.donations);
router.post('/donation', auth(Shopkeeper), shopkeeperCtlr.do_donation);

module.exports = router;
