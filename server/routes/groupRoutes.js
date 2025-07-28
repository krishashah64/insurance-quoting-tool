const express = require('express');
const Group = require('../models/Group');
const router = express.Router();

router.post('/', async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.json(group);
});

router.get('/', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

module.exports = router;
