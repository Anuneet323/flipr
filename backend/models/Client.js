const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  imagePublicId: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
