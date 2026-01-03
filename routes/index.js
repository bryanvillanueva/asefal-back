const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./authRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const rolRoutes = require('./rolRoutes');
const torneoRoutes = require('./torneoRoutes');
const clubRoutes = require('./clubRoutes');
const sedeRoutes = require('./sedeRoutes');
const partidoRoutes = require('./partidoRoutes');

// Definir rutas base
router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/roles', rolRoutes);
router.use('/torneos', torneoRoutes);
router.use('/clubes', clubRoutes);
router.use('/sedes', sedeRoutes);
router.use('/partidos', partidoRoutes);

// Ruta de health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API ASEFAL funcionando correctamente',
    timestamp: new Date(),
    endpoints: {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      roles: '/api/roles',
      torneos: '/api/torneos',
      clubes: '/api/clubes',
      sedes: '/api/sedes',
      partidos: '/api/partidos'
    }
  });
});

module.exports = router;
