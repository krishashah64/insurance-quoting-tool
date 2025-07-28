const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  zip: String,
  state: String,
  effective_date: String,
  industry_code: String,
  ideonGroupId: String,  
});

module.exports = mongoose.model('Group', groupSchema);
