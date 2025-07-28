const mongoose = require('mongoose');

const affordabilitySchema = new mongoose.Schema({
  ideonMemberId: String,
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  affordable: Boolean,
  employee_contribution: Number,
  employer_contribution: Number,
  ichra_contribution: Number,
  lowest_cost_plan_premium: Number,
  benchmark_plan_premium: Number,
  fpl_percentage: Number
});

module.exports = mongoose.model('Affordability', affordabilitySchema);
