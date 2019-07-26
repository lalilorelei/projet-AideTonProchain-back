const express = require('express');

const router = express.Router();

const shopkeeperCtlr = require('./controllers');

router.post('/register', shopkeeperCtlr.register);
router.post('/connexion', shopkeeperCtlr.connexion);
router.post('/profil/:id', shopkeeperCtlr.profil);
router.patch('/profil-update/:id', shopkeeperCtlr.profil_update);

module.exports = router;
