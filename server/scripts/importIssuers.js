const mongoose = require('mongoose');
const csv = require('csvtojson');
const Issuer = require('../models/Issuer');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const issuers = await csv().fromFile('data/issuers.csv');
    await Issuer.deleteMany({});
    await Issuer.insertMany(issuers);
    console.log(`Imported ${issuers.length} issuers`);
    process.exit();
  })
  .catch(err => console.error(err));
