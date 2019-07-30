const express = require('express');

const auth = require('../../middlewares/auth');
const Donor = require('../donor/model');
const Beneficiary = require('../beneficiary/model');
const Shopkeeper = require('../shopkeeper/model');

const router = express.Router();

const donationCtlr = require('./controllers');

router.get('/donor/:id', auth(Donor), donationCtlr.donation);
router.get('/beneficiary/:id', auth(Beneficiary), donationCtlr.donation);
router.get('/shopkeeper/:id', auth(Shopkeeper), donationCtlr.donation);

router.get('/donor', auth(Donor), donationCtlr.donations);
router.get('/beneficiary', auth(Beneficiary), donationCtlr.donations);
router.get('/shopkeeper', auth(Shopkeeper), donationCtlr.donations);

router.post('/donor', auth(Donor), donationCtlr.do_donation);
router.post('/beneficiary', auth(Beneficiary), donationCtlr.do_donation);
router.post('/shopkeeper', auth(Shopkeeper), donationCtlr.do_donation);

module.exports = router;
