const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 700, // ~85 requests/min
});

module.exports = limiter;