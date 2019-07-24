const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const donorSchema = mongoose.Schema({});

// donorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Donor', donorSchema);
