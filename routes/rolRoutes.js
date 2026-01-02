const express = require('express');
const router = express.Router();
const { getAllRoles, getRolById } = require('../controllers/rolController');

router.get('/', getAllRoles);
router.get('/:id', getRolById);

module.exports = router;
