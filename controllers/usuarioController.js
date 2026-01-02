const { Usuario, Rol } = require('../models');

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password_hash'] },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['id', 'nombre']
      }]
    });
    res.json({
      success: true,
      data: usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['id', 'nombre']
      }]
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error.message
    });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Validación básica
    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y password son requeridos'
      });
    }

    const nuevoUsuario = await User.create({
      nombre,
      email,
      password,
      rol: rol || 'usuario'
    });

    // No devolver la contraseña
    const usuarioRespuesta = nuevoUsuario.toJSON();
    delete usuarioRespuesta.password;

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: usuarioRespuesta
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
      error: error.message
    });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    await usuario.update({
      nombre: nombre || usuario.nombre,
      email: email || usuario.email,
      rol: rol || usuario.rol
    });

    const usuarioActualizado = usuario.toJSON();
    delete usuarioActualizado.password;

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuarioActualizado
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: error.message
    });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    await usuario.destroy();

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
