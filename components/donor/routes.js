const express = require('express');

const auth = require('../../middlewares/auth');

const router = express.Router();

const donorCtlr = require('./controllers');
const Donor = require('./model');

router.post('/register', donorCtlr.register);
router.post('/connexion', donorCtlr.connexion);
router.get('/profil/', auth(Donor), donorCtlr.profil);
router.patch('/profil-update/', auth(Donor), donorCtlr.profil_update);
router.post('/logout', auth(Donor), donorCtlr.logout);
router.post('/logoutAll', auth(Donor), donorCtlr.logoutAll);

module.exports = router;
