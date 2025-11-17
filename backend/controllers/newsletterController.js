const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(200).json({ message: 'Already subscribed' });
    const sub = new Newsletter({ email });
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(200).json({ message: 'Already subscribed' });
    res.status(500).json({ message: err.message });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subs = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
