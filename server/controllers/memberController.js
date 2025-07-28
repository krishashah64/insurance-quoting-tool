const Member = require('../models/Member');

exports.createMember = async (req, res) => {
  try {
    const mockMemberId = `mock-member-${Date.now()}`;
    const memberData = { ...req.body, ideonMemberId: mockMemberId };

    const newMember = new Member(memberData);
    await newMember.save();

    res.status(201).json(newMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create member' });
  }
};
