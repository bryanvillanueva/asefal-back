const express = require('express');
const router = express.Router();
const { getAllSedes, getSedeById, createSede, updateSede, deleteSede } = require('../controllers/sedeController');

router.get('/', getAllSedes);
router.get('/:id', getSedeById);
router.post('/', createSede);
router.put('/:id', updateSede);
router.delete('/:id', deleteSede);

module.exports = router;
