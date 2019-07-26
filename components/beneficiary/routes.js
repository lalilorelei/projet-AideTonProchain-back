const express = require('express');

const router = express.Router();

const beneficiaryCtlr = require('./controllers');

router.post('/register', beneficiaryCtlr.register);
router.post('/connexion', beneficiaryCtlr.connexion);
router.post('/profil/:id', beneficiaryCtlr.profil);
router.patch('/profil-update/:id', beneficiaryCtlr.profil_update);

module.exports = router;
