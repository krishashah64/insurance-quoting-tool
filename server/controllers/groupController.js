const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
  try {
    const mockIdeonId = `mock-${Date.now()}`;
    const groupData = { ...req.body, ideonGroupId: mockIdeonId };

    const newGroup = new Group(groupData);
    await newGroup.save();

    res.status(201).json(newGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create group' });
  }
};
