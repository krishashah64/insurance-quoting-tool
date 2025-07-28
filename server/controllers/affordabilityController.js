const { calculateIchraAffordability } = require('../utils/ideonApi');
const Group = require('../models/Group');
const Member = require('../models/Member');
const Affordability = require('../models/Affordability'); 

exports.checkIchraAffordability = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group || !group.ideonGroupId) {
      return res.status(404).json({ error: 'Group not found or not synced with Ideon' });
    }

    const members = await Member.find({ groupId });
    if (!members.length) return res.status(404).json({ error: 'No members found' });

    const payload = {
      members: members.map(m => ({
        member_id: m.ideonMemberId,
        employee_contribution: m.old_employee_contribution || 0,
        employer_contribution: m.old_employer_contribution || 0,
        ichra_contribution: m.ichra_contribution || 0
      }))
    };

    const { data: affordabilityResults } = await calculateIchraAffordability(payload);

    for (const result of affordabilityResults.results) {
      await Affordability.findOneAndUpdate(
        { ideonMemberId: result.member_id },
        { ...result, groupId },
        { upsert: true, new: true }
      );
    }

    res.json(affordabilityResults);
  } catch (err) {
    console.error('Affordability Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to calculate ICHRA affordability' });
  }
};
