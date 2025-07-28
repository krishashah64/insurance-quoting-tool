const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const ZipCounty = require('../models/ZipCounty');
const PlanCounty = require('../models/PlanCounty');
const Pricing = require('../models/Pricing');
const Plan = require('../models/Plan');
const Affordability = require('../models/Affordability');


router.post('/', async (req, res) => {
  try {
    const { groupId } = req.body;
    console.log('POST /api/quote hit with groupId:', req.body.groupId);


    
    const members = await Member.find({ groupId });
    
    console.log(`Found ${members.length} members for group ${req.body.groupId}`);

    if (members.length === 0) return res.status(404).json({ message: 'No members found.' });

    
    const affordabilityMap = {};
    const affordabilityResults = await Affordability.find({ groupId });

    for (const a of affordabilityResults) {
      affordabilityMap[a.ideonMemberId] = a;
    }

    let allQuotes = [];

    for (const member of members) {
       console.log(`Processing member: ${member.name}, Zip: ${member.zip}, Age: ${member.age}, Tobacco: ${member.tobacco}`);

      const zipMatch = await ZipCounty.findOne({ zip_code_id: member.zip });
      if (!zipMatch) continue;

      const { county_id, rating_area_id } = zipMatch;

      const planCountyMatches = await PlanCounty.find({ county_id });
      const planIds = planCountyMatches.map(p => p.plan_id);

      for (const plan_id of planIds) {
        const pricing = await Pricing.findOne({ plan_id, rating_area_id });
        if (!pricing) continue;

        const ageKey = `age_${member.age}${member.tobacco ? '_tobacco' : ''}`;
        const monthlyPremium = parseFloat(pricing[ageKey]) || 0;

        const affordability = affordabilityMap[member.ideonMemberId];

        allQuotes.push({
          memberId: member._id,
          memberName: member.name,
          plan_id,
          premium: monthlyPremium,
          affordability: affordability || null, 
        });


      }
    }

    const planTotals = {};

    for (const quote of allQuotes) {
      if (!planTotals[quote.plan_id]) {
        planTotals[quote.plan_id] = { plan_id: quote.plan_id, totalPremium: 0, members: [] };
      }
      planTotals[quote.plan_id].totalPremium += quote.premium;
      planTotals[quote.plan_id].members.push({
        memberId: quote.memberId,
        name: quote.memberName,
        premium: quote.premium,
        affordability: quote.affordability || null,
      });
    }

    const plans = await Plan.find({ id: { $in: Object.keys(planTotals) } });

    const result = Object.values(planTotals).map(p => {
      const planDetails = plans.find(pl => pl.id === p.plan_id);
      return {
        ...p,
        planDetails: planDetails || {},
      };
    });

    res.json(result);
  } catch (err) {
    console.error('Quote error:', err);
    res.status(500).json({ message: 'Failed to generate quote.' });
  }
});

module.exports = router;
