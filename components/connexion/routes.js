const express = require('express');

const router = express.Router();

const connexionCtlr = require('./controllers');

router.post('/', connexionCtlr.connexion);

module.exports = router;
