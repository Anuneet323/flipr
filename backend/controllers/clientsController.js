const Client = require('../models/Client');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

async function uploadBufferToCloud(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 450, height: 350, crop: 'fill' }] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

exports.createClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });

    let imageUrl = '', publicId = '';
    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloud(req.file.buffer, 'flipr/clients');
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const client = new Client({ name, designation, description, image: imageUrl, imagePublicId: publicId });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const c = await Client.findById(id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    if (c.imagePublicId) await cloudinary.uploader.destroy(c.imagePublicId);
    await c.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, description } = req.body;
    const c = await Client.findById(id);
    if (!c) return res.status(404).json({ message: 'Not found' });

    let imageUrl = c.image;
    let publicId = c.imagePublicId;

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloud(req.file.buffer, 'flipr/clients');
      imageUrl = result.secure_url;
      publicId = result.public_id;
      if (c.imagePublicId) await cloudinary.uploader.destroy(c.imagePublicId);
    }

    c.name = name || c.name;
    c.designation = designation || c.designation;
    c.description = description || c.description;
    c.image = imageUrl;
    c.imagePublicId = publicId;
    await c.save();
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
