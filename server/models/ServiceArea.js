const mongoose = require('mongoose');
const ServiceAreaSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('ServiceArea', ServiceAreaSchema);
