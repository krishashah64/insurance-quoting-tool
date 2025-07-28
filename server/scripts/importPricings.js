const mongoose = require('mongoose');
const csv = require('csvtojson');
const Pricing = require('../models/Pricing');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const pricings = await csv().fromFile('data/pricings.csv');
    await Pricing.deleteMany({});
    await Pricing.insertMany(pricings);
    console.log(`Imported ${pricings.length} pricing records`);
    process.exit();
  })
  .catch(err => console.error(err));