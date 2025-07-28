exports.generateQuote = async (req, res) => {
  try {

    res.json({ message: 'Quote generated (mock)', plans: [] });
  } catch (err) {
    res.status(500).json({ error: 'Quote generation failed' });
  }
};

exports.getQuoteSummary = async (req, res) => {
  try {

    res.json({ message: 'Summary for group', groupId: req.params.groupId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};
