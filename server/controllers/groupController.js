const Group = require('../models/Group');
const { createGroup } = require('../utils/ideonApi');

exports.createGroup = async (req, res) => {
  try {
    // Calling Ideon API to create the group
    const ideonPayload = {
      name: req.body.name,
      zip: req.body.zip,
      state: req.body.state,
      effective_date: req.body.effective_date,
      industry_code: req.body.industry_code || '222222' 
    };

    const { data: ideonGroup } = await createGroup(ideonPayload);


    const groupData = {
      ...req.body,
      ideonGroupId: ideonGroup.id,  
    };

    const newGroup = new Group(groupData);
    await newGroup.save();

    res.status(201).json(newGroup);
  } catch (err) {
    console.error('Failed to create group:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create group' });
  }
};
