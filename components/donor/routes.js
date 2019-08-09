const express = require('express');
// const multer = require('multer');

const auth = require('../../middlewares/auth');

const router = express.Router();

const donorCtlr = require('./controllers');
const Donor = require('./model');

const beneficiaryCtlr = require('../beneficiary/controllers');
const shopkeeperCtlr = require('../shopkeeper/controllers');

const utilCtlr = require('../utils_components/controllers/index');

router.post('/register', utilCtlr.upload.single('avatar'), donorCtlr.register);
router.post('/connexion', donorCtlr.connexion);
router.get('/profil/', auth(Donor), donorCtlr.profil);
router.patch(
  '/profil-update/',
  auth(Donor),
  utilCtlr.upload.single('avatar'),
  donorCtlr.profil_update,
);
router.post('/logout', auth(Donor), donorCtlr.logout);
router.post('/logoutAll', auth(Donor), donorCtlr.logoutAll);

router.get('/disable', auth(Donor), donorCtlr.disable);

router.get('/donations/:id', auth(Donor), donorCtlr.donation);
router.get('/donations', auth(Donor), donorCtlr.donations);
router.post('/donation', auth(Donor), donorCtlr.do_donation);

router.get('/search-beneficiary', auth(Donor), beneficiaryCtlr.search);
router.get('/search-shopkeeper', auth(Donor), shopkeeperCtlr.search);

router.get('/shopkeepers', auth(Donor), shopkeeperCtlr.shopkeeperList);
router.get('/shopkeepers/:id', auth(Donor), shopkeeperCtlr.shopkeeperSingle);

router.get('/beneficiaries', auth(Donor), beneficiaryCtlr.beneficiaryList);
router.get('/beneficiaries/:id', auth(Donor), beneficiaryCtlr.beneficiarySingle);

module.exports = router;
