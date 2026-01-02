const express = require('express');
const router = express.Router();
const { getAllClubes, getClubById, createClub, updateClub, deleteClub } = require('../controllers/clubController');

router.get('/', getAllClubes);
router.get('/:id', getClubById);
router.post('/', createClub);
router.put('/:id', updateClub);
router.delete('/:id', deleteClub);

module.exports = router;
