const mongoose = require('mongoose');
const ZipCountySchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('ZipCounty', ZipCountySchema);