const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/newsletterController');

router.post('/', ctrl.subscribe);
router.get('/', ctrl.getSubscribers);

module.exports = router;
