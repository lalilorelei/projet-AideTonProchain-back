const express = require('express');

const router = express.Router();

const { profil, register } = require('./controllers');

router.get('/profil', profil);
router.post('/register', register);

module.exports = router;
