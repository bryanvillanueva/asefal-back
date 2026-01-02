const express = require('express');
const router = express.Router();
const {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} = require('../controllers/usuarioController');

// Rutas públicas (GET)
router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);

// Rutas protegidas (POST, PUT, DELETE)
// TODO: Agregar middleware de autenticación cuando implementemos JWT
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
