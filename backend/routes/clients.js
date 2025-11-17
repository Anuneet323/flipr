const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const ctrl = require('../controllers/clientsController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, upload.single('image'), ctrl.createClient);
router.get('/', ctrl.getClients);
router.delete('/:id', auth, ctrl.deleteClient);
router.put('/:id', auth, upload.single('image'), ctrl.updateClient);

module.exports = router;
