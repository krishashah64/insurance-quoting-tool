const express = require('express');
const Member = require('../models/Member');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    console.error('Failed to save member:', err);
    res.status(500).json({ error: 'Failed to save member' });
  }
});

router.get('/group/:groupId', async (req, res) => {
  const members = await Member.find({ groupId: req.params.groupId });
  res.json(members);
});

module.exports = router;