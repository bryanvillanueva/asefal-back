const { Sede, Partido } = require('../models');

const getAllSedes = async (req, res) => {
  try {
    const sedes = await Sede.findAll({ include: [{ model: Partido, as: 'partidos' }] });
    res.json({ success: true, data: sedes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener sedes', error: error.message });
  }
};

const getSedeById = async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await Sede.findByPk(id, { include: [{ model: Partido, as: 'partidos' }] });
    if (!sede) return res.status(404).json({ success: false, message: 'Sede no encontrada' });
    res.json({ success: true, data: sede });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener sede', error: error.message });
  }
};

const createSede = async (req, res) => {
  try {
    const { nombre, direccion, ciudad } = req.body;
    if (!nombre || !ciudad) return res.status(400).json({ success: false, message: 'Nombre y ciudad son requeridos' });

    const nuevaSede = await Sede.create({ nombre, direccion, ciudad });
    res.status(201).json({ success: true, message: 'Sede creada exitosamente', data: nuevaSede });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear sede', error: error.message });
  }
};

const updateSede = async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await Sede.findByPk(id);
    if (!sede) return res.status(404).json({ success: false, message: 'Sede no encontrada' });

    await sede.update(req.body);
    res.json({ success: true, message: 'Sede actualizada exitosamente', data: sede });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar sede', error: error.message });
  }
};

const deleteSede = async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await Sede.findByPk(id);
    if (!sede) return res.status(404).json({ success: false, message: 'Sede no encontrada' });

    await sede.destroy();
    res.json({ success: true, message: 'Sede eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar sede', error: error.message });
  }
};

module.exports = { getAllSedes, getSedeById, createSede, updateSede, deleteSede };
