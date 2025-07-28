const mongoose = require('mongoose');
const PlanCountySchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('PlanCounty', PlanCountySchema);
