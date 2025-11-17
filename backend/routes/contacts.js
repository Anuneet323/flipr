const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactsController');

router.post('/', ctrl.createContact);
router.get('/', ctrl.getContacts);

module.exports = router;
