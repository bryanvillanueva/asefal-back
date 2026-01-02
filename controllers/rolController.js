const { Rol, Usuario } = require('../models');

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll({
      include: [{
        model: Usuario,
        as: 'usuarios',
        attributes: ['id', 'nombre_completo', 'email', 'activo']
      }]
    });
    res.json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener roles',
      error: error.message
    });
  }
};

// Obtener un rol por ID
const getRolById = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id, {
      include: [{
        model: Usuario,
        as: 'usuarios',
        attributes: ['id', 'nombre_completo', 'email', 'activo']
      }]
    });

    if (!rol) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    res.json({
      success: true,
      data: rol
    });
  } catch (error) {
    console.error('Error al obtener rol:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener rol',
      error: error.message
    });
  }
};

module.exports = {
  getAllRoles,
  getRolById
};
