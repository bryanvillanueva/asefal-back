const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos'
      });
    }

    // Buscar usuario por email
    const usuario = await Usuario.findOne({
      where: { email },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['id', 'nombre', 'descripcion']
      }]
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(403).json({
        success: false,
        message: 'Usuario inactivo. Contacte al administrador'
      });
    }

    // Comparar contraseña
    const isPasswordValid = await bcrypt.compare(password, usuario.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre
      },
      process.env.JWT_SECRET || 'secret_temporal_desarrollo',
      { expiresIn: '24h' }
    );

    // Preparar respuesta sin contraseña
    const usuarioRespuesta = {
      id: usuario.id,
      nombre_completo: usuario.nombre_completo,
      email: usuario.email,
      activo: usuario.activo,
      rol: usuario.rol
    };

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        token,
        usuario: usuarioRespuesta
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Registro de usuario
const register = async (req, res) => {
  try {
    const { nombre_completo, email, password, rol_id } = req.body;

    // Validación básica
    if (!nombre_completo || !email || !password || !rol_id) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Verificar que el rol exista
    const rol = await Rol.findByPk(rol_id);
    if (!rol) {
      return res.status(400).json({
        success: false,
        message: 'Rol inválido'
      });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre_completo,
      email,
      password_hash,
      rol_id,
      activo: true
    });

    // Obtener usuario con rol incluido
    const usuarioConRol = await Usuario.findByPk(nuevoUsuario.id, {
      attributes: { exclude: ['password_hash'] },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['id', 'nombre', 'descripcion']
      }]
    });

    // Generar token
    const token = jwt.sign(
      {
        id: usuarioConRol.id,
        email: usuarioConRol.email,
        rol: usuarioConRol.rol.nombre
      },
      process.env.JWT_SECRET || 'secret_temporal_desarrollo',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        token,
        usuario: usuarioConRol
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// Obtener perfil del usuario autenticado
const getProfile = async (req, res) => {
  try {
    // req.user viene del middleware de autenticación
    const usuario = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] },
      include: [{
        model: Rol,
        as: 'rol',
        attributes: ['id', 'nombre', 'descripcion']
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
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};

module.exports = {
  login,
  register,
  getProfile
};
