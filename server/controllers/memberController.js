const Member = require('../models/Member');
const Group = require('../models/Group');
const { createMember } = require('../utils/ideonApi');

exports.createMember = async (req, res) => {
  try {
    const { groupId } = req.params; 
    const group = await Group.findById(groupId);

    if (!group || !group.ideonGroupId) {
      return res.status(404).json({ error: 'Group not found or not synced with Ideon' });
    }

    const ideonPayload = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.dob,
      zip: req.body.zip,
      tobacco_use: req.body.tobacco_use || false
    };

    const { data: ideonMember } = await createMember(group.ideonGroupId, ideonPayload);

  
    const localMember = new Member({
      groupId: group._id,
      ideonMemberId: ideonMember.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      zip: req.body.zip,
      tobacco: req.body.tobacco_use || false,
      age: req.body.age || null 
    });

    await localMember.save();
    res.status(201).json(localMember);
  } catch (err) {
    console.error('Failed to create member:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to create member' });
  }
};
