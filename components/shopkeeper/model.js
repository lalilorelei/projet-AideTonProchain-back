const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const shopkeeperSchema = mongoose.Schema({});

// shopkeeperSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Shopkeeper', shopkeeperSchema);
