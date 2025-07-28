const mongoose = require('mongoose');
const csv = require('csvtojson');
const ServiceArea = require('../models/ServiceArea');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const data = await csv().fromFile('data/service_areas.csv');
    await ServiceArea.deleteMany({});
    await ServiceArea.insertMany(data);
    console.log(`Imported ${data.length} service areas`);
    process.exit();
  })
  .catch(err => console.error(err));
