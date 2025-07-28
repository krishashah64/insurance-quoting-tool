const mongoose = require('mongoose');
const ServiceAreaZipCountySchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('ServiceAreaZipCounty', ServiceAreaZipCountySchema);
