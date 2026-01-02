const { Torneo, Categoria } = require('../models');

// Obtener todos los torneos
const getAllTorneos = async (req, res) => {
  try {
    const torneos = await Torneo.findAll({
      include: [{
        model: Categoria,
        as: 'categorias'
      }]
    });
    res.json({
      success: true,
      data: torneos
    });
  } catch (error) {
    console.error('Error al obtener torneos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener torneos',
      error: error.message
    });
  }
};

// Obtener un torneo por ID
const getTorneoById = async (req, res) => {
  try {
    const { id } = req.params;
    const torneo = await Torneo.findByPk(id, {
      include: [{
        model: Categoria,
        as: 'categorias'
      }]
    });

    if (!torneo) {
      return res.status(404).json({
        success: false,
        message: 'Torneo no encontrado'
      });
    }

    res.json({
      success: true,
      data: torneo
    });
  } catch (error) {
    console.error('Error al obtener torneo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener torneo',
      error: error.message
    });
  }
};

// Crear un nuevo torneo
const createTorneo = async (req, res) => {
  try {
    const { nombre, fecha_inicio, fecha_fin, estado } = req.body;

    if (!nombre || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, fecha de inicio y fecha de fin son requeridos'
      });
    }

    const nuevoTorneo = await Torneo.create({
      nombre,
      fecha_inicio,
      fecha_fin,
      estado: estado || 'ACTIVO'
    });

    res.status(201).json({
      success: true,
      message: 'Torneo creado exitosamente',
      data: nuevoTorneo
    });
  } catch (error) {
    console.error('Error al crear torneo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear torneo',
      error: error.message
    });
  }
};

// Actualizar un torneo
const updateTorneo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, fecha_inicio, fecha_fin, estado } = req.body;

    const torneo = await Torneo.findByPk(id);

    if (!torneo) {
      return res.status(404).json({
        success: false,
        message: 'Torneo no encontrado'
      });
    }

    await torneo.update({
      nombre: nombre || torneo.nombre,
      fecha_inicio: fecha_inicio || torneo.fecha_inicio,
      fecha_fin: fecha_fin || torneo.fecha_fin,
      estado: estado || torneo.estado
    });

    res.json({
      success: true,
      message: 'Torneo actualizado exitosamente',
      data: torneo
    });
  } catch (error) {
    console.error('Error al actualizar torneo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar torneo',
      error: error.message
    });
  }
};

// Eliminar un torneo
const deleteTorneo = async (req, res) => {
  try {
    const { id } = req.params;

    const torneo = await Torneo.findByPk(id);

    if (!torneo) {
      return res.status(404).json({
        success: false,
        message: 'Torneo no encontrado'
      });
    }

    await torneo.destroy();

    res.json({
      success: true,
      message: 'Torneo eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar torneo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar torneo',
      error: error.message
    });
  }
};

module.exports = {
  getAllTorneos,
  getTorneoById,
  createTorneo,
  updateTorneo,
  deleteTorneo
};
