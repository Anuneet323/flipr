const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    if (!fullName || !email) return res.status(400).json({ message: 'Name and email required' });
    const c = new Contact({ fullName, email, mobile, city });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
