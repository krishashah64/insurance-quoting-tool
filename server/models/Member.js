const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  ideonMemberId: String,
  first_name: String,
  last_name: String,
  dob: String,
  zip: String,
  tobacco: Boolean,
  age: Number
});
