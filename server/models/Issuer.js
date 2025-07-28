const mongoose = require('mongoose');
const IssuerSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('Issuer', IssuerSchema);
