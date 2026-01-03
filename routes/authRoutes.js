const express = require('express');
const router = express.Router();
const { login, register, getProfile } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');

// Rutas públicas
router.post('/login', login);
router.post('/register', register);

// Rutas protegidas
router.get('/profile', verifyToken, getProfile);

module.exports = router;
