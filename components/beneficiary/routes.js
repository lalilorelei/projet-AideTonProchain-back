const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const Beneficiary = require('./model');
const beneficiaryCtlr = require('./controllers');
const shopkeeperCtlr = require('../shopkeeper/controllers');

const utilCtlr = require('../utils_components/controllers/index');

router.post('/register', beneficiaryCtlr.register);
router.post('/connexion', beneficiaryCtlr.connexion);
router.get('/profil/', auth(Beneficiary), beneficiaryCtlr.profil);
router.patch('/profil-update/', auth(Beneficiary), beneficiaryCtlr.profil_update);
router.post('/logout', auth(Beneficiary), beneficiaryCtlr.logout);
router.post('/logoutAll', auth(Beneficiary), beneficiaryCtlr.logoutAll);

router.get('/disable', auth(Beneficiary), beneficiaryCtlr.disable);

router.get('/donations/:id', auth(Beneficiary), beneficiaryCtlr.donation);
router.get('/donations', auth(Beneficiary), beneficiaryCtlr.donations);

router.post('/shopkeepers-distance', auth(Beneficiary), shopkeeperCtlr.shopkeeperDistance);
router.post('/beneficiaries-distance', auth(Beneficiary), beneficiaryCtlr.beneficiaryDistance);

router.get('/shopkeepers', auth(Beneficiary), shopkeeperCtlr.shopkeeperList);
router.get('/shopkeepers/:id', auth(Beneficiary), shopkeeperCtlr.shopkeeperSingle);

router.post(
  '/upload',
  auth(Beneficiary),
  utilCtlr.upload.single('avatar'),
  beneficiaryCtlr.upload_avatar,
);

module.exports = router;
