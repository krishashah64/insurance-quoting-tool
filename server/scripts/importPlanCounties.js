const mongoose = require('mongoose');
const csv = require('csvtojson');
const PlanCounty = require('../models/PlanCounty');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const data = await csv().fromFile('data/plan_Counties.csv');
    await PlanCounty.deleteMany({});
    await PlanCounty.insertMany(data);
    console.log(`Imported ${data.length} plan-county links`);
    process.exit();
  })
  .catch(err => console.error(err));
