const mongoose = require('mongoose');
const csv = require('csvtojson');
const ZipCounty = require('../models/ZipCounty');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const data = await csv().fromFile('data/zip_counties.csv');
    await ZipCounty.deleteMany({});
    await ZipCounty.insertMany(data);
    console.log(`Imported ${data.length} zip-county mappings`);
    process.exit();
  })
  .catch(err => console.error(err));
