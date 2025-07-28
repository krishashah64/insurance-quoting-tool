const express = require('express');
const Member = require('../models/Member');
const router = express.Router();

router.post('/', async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.json(member);
});

router.get('/group/:groupId', async (req, res) => {
  const members = await Member.find({ groupId: req.params.groupId });
  res.json(members);
});

module.exports = router;