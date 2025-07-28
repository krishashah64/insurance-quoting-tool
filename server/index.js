require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const rateLimiter = require('./utils/rateLimiter');
const groupRoutes = require('./routes/groupRoutes');
const memberRoutes = require('./routes/memberRoutes');
const classRoutes = require('./routes/classRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const affordabilityRoutes = require('./routes/affordabilityRoutes');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_tool')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.use('/api/groups', groupRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/quote', quoteRoutes);

app.use('/api/affordability', affordabilityRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));