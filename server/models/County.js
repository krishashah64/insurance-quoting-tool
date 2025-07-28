const mongoose = require('mongoose');
const CountySchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('County', CountySchema);