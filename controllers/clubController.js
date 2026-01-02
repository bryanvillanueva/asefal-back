const { Club, Usuario, Equipo } = require('../models');

const getAllClubes = async (req, res) => {
  try {
    const clubes = await Club.findAll({
      include: [
        {
          model: Usuario,
          as: 'delegado',
          attributes: ['id', 'nombre_completo', 'email']
        },
        {
          model: Equipo,
          as: 'equipos'
        }
      ]
    });
    res.json({ success: true, data: clubes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener clubes', error: error.message });
  }
};

const getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id, {
      include: [
        { model: Usuario, as: 'delegado', attributes: ['id', 'nombre_completo', 'email'] },
        { model: Equipo, as: 'equipos' }
      ]
    });
    if (!club) return res.status(404).json({ success: false, message: 'Club no encontrado' });
    res.json({ success: true, data: club });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener club', error: error.message });
  }
};

const createClub = async (req, res) => {
  try {
    const { nombre, logo_url, delegado_usuario_id } = req.body;
    if (!nombre) return res.status(400).json({ success: false, message: 'Nombre es requerido' });

    const nuevoClub = await Club.create({ nombre, logo_url, delegado_usuario_id });
    res.status(201).json({ success: true, message: 'Club creado exitosamente', data: nuevoClub });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear club', error: error.message });
  }
};

const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ success: false, message: 'Club no encontrado' });

    await club.update(req.body);
    res.json({ success: true, message: 'Club actualizado exitosamente', data: club });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar club', error: error.message });
  }
};

const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ success: false, message: 'Club no encontrado' });

    await club.destroy();
    res.json({ success: true, message: 'Club eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar club', error: error.message });
  }
};

module.exports = { getAllClubes, getClubById, createClub, updateClub, deleteClub };
