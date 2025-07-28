const mongoose = require('mongoose');
const PricingSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('Pricing', PricingSchema);

