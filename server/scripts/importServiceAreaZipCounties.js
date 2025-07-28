const mongoose = require('mongoose');
const csv = require('csvtojson');
const ServiceAreaZipCounty = require('../models/ServiceAreaZipCounty');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const data = await csv().fromFile('data/service_area_zip_counties.csv');
    await ServiceAreaZipCounty.deleteMany({});
    await ServiceAreaZipCounty.insertMany(data);
    console.log(`Imported ${data.length} service_area_zip_county records`);
    process.exit();
  })
  .catch(err => console.error(err));
