const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const beneficiaryCtlr = require('./controllers');
const Beneficiary = require('./model');

router.post('/register', beneficiaryCtlr.register);
router.post('/connexion', beneficiaryCtlr.connexion);
router.get('/profil/', auth(Beneficiary), beneficiaryCtlr.profil);
router.patch('/profil-update/:id', auth(Beneficiary), beneficiaryCtlr.profil_update);
router.post('/logout', auth(Beneficiary), auth(Beneficiary), beneficiaryCtlr.logout);
router.post('/logoutAll', auth(Beneficiary), auth(Beneficiary), beneficiaryCtlr.logoutAll);

module.exports = router;
