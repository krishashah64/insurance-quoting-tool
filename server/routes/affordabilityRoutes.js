const express = require('express');
const router = express.Router();
const { checkIchraAffordability } = require('../controllers/affordabilityController');

router.post('/ichra/:groupId', checkIchraAffordability);

module.exports = router;
