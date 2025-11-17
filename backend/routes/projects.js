const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const ctrl = require('../controllers/projectsController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, upload.single('image'), ctrl.createProject);
router.get('/', ctrl.getProjects);
router.delete('/:id', auth, ctrl.deleteProject);
router.put('/:id', auth, upload.single('image'), ctrl.updateProject);

module.exports = router;
