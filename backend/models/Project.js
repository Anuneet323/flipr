const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' }, // cloudinary url
  imagePublicId: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
