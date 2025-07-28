const IchraClass = require('../models/IchraClass');

exports.createClass = async (req, res) => {
  try {
    const newClass = new IchraClass(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create ICHRA class' });
  }
};
