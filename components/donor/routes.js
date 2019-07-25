const express = require('express');

const router = express.Router();

const donorCtlr = require('./controllers');

router.post('/register', donorCtlr.register);
router.post('/connexion', donorCtlr.connexion);
router.post('/profil/:id', donorCtlr.profil);
router.patch('/profil-update/:id', donorCtlr.profil_update);

module.exports = router;
