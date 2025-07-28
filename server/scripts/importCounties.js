const mongoose = require('mongoose');
const csv = require('csvtojson');
const County = require('../models/County');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const counties = await csv().fromFile('data/counties.csv');
    await County.deleteMany({});
    await County.insertMany(counties);
    console.log(`Imported ${counties.length} counties`);
    process.exit();
  })
  .catch(err => console.error(err));
