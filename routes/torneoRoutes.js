const express = require('express');
const router = express.Router();
const { getAllTorneos, getTorneoById, createTorneo, updateTorneo, deleteTorneo } = require('../controllers/torneoController');

router.get('/', getAllTorneos);
router.get('/:id', getTorneoById);
router.post('/', createTorneo);
router.put('/:id', updateTorneo);
router.delete('/:id', deleteTorneo);

module.exports = router;
