const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const beneficiaryCtlr = require('./controllers');
const Beneficiary = require('./model');

router.post('/register', beneficiaryCtlr.register);
router.post('/connexion', beneficiaryCtlr.connexion);
router.get('/profil/', auth(Beneficiary), beneficiaryCtlr.profil);
router.patch('/profil-update/', auth(Beneficiary), beneficiaryCtlr.profil_update);
router.post('/logout', auth(Beneficiary), auth(Beneficiary), beneficiaryCtlr.logout);
router.post('/logoutAll', auth(Beneficiary), auth(Beneficiary), beneficiaryCtlr.logoutAll);

router.get('/donations/:id', auth(Beneficiary), beneficiaryCtlr.donation);
router.get('/donations', auth(Beneficiary), beneficiaryCtlr.donations);
router.post('/donation', auth(Beneficiary), beneficiaryCtlr.do_donation);

module.exports = router;
