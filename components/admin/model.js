const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({});

// adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);
