const mongoose = require('mongoose');
const csv = require('csvtojson');
const RatingArea = require('../models/RatingArea');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(async () => {
    console.log('MongoDB connected');
    const areas = await csv().fromFile('data/rating_areas.csv');
    await RatingArea.deleteMany({});
    await RatingArea.insertMany(areas);
    console.log(`Imported ${areas.length} rating areas`);
    process.exit();
  })
  .catch(err => console.error(err));
