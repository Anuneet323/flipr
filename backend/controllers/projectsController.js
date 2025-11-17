const Project = require('../models/Project');
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

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });

    let imageUrl = '', publicId = '';
    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloud(req.file.buffer, 'flipr/projects');
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const project = new Project({ name, description, image: imageUrl, imagePublicId: publicId });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const p = await Project.findById(id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    if (p.imagePublicId) {
      await cloudinary.uploader.destroy(p.imagePublicId);
    }
    await p.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const p = await Project.findById(id);
    if (!p) return res.status(404).json({ message: 'Not found' });

    let imageUrl = p.image;
    let publicId = p.imagePublicId;

    if (req.file && req.file.buffer) {
      // upload new and delete old
      const result = await uploadBufferToCloud(req.file.buffer, 'flipr/projects');
      imageUrl = result.secure_url;
      publicId = result.public_id;
      if (p.imagePublicId) {
        await cloudinary.uploader.destroy(p.imagePublicId);
      }
    }

    p.name = name || p.name;
    p.description = description || p.description;
    p.image = imageUrl;
    p.imagePublicId = publicId;
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
