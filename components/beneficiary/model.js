const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const beneficiarySchema = mongoose.Schema({});

// beneficiarySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Beneficiary', beneficiarySchema);
