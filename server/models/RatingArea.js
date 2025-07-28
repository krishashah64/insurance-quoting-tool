const mongoose = require('mongoose');
const RatingAreaSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('RatingArea', RatingAreaSchema);