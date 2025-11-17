const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, default: '' },
  city: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
