const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    // Verificar token
    jwt.verify(token, process.env.JWT_SECRET || 'secret_temporal_desarrollo', (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token inválido o expirado'
        });
      }

      // Guardar datos del usuario en el request
      req.user = decoded;
      next();
    });

  } catch (error) {
    console.error('Error en verificación de token:', error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar token',
      error: error.message
    });
  }
};

// Middleware para verificar roles específicos
const checkRole = (rolesPermitidos) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no autenticado'
        });
      }

      const userRole = req.user.rol;

      if (!rolesPermitidos.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para realizar esta acción'
        });
      }

      next();
    } catch (error) {
      console.error('Error en verificación de rol:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar permisos',
        error: error.message
      });
    }
  };
};

module.exports = {
  verifyToken,
  checkRole
};
