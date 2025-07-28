const mongoose = require('mongoose');
const csv = require('csvtojson');
const Plan = require('../models/Plan');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const plans = await csv().fromFile('data/plans.csv');
    await Plan.deleteMany({});
    await Plan.insertMany(plans);
    console.log(`Imported ${plans.length} plans`);
    process.exit();
  })
  .catch(err => console.error(err));
