const express = require('express');
const router = express.Router();
const { getAllPartidos, getPartidoById, createPartido, updatePartido, deletePartido } = require('../controllers/partidoController');

router.get('/', getAllPartidos);
router.get('/:id', getPartidoById);
router.post('/', createPartido);
router.put('/:id', updatePartido);
router.delete('/:id', deletePartido);

module.exports = router;
