const mongoose = require('mongoose');
const MemberSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  name: String,
  age: Number,
  zip: String,
  tobacco: Boolean,
  classId: String,
  previousEmployerContribution: Number,
  previousMemberContribution: Number,
});
module.exports = mongoose.model('Member', MemberSchema);