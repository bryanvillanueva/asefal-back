const { Partido, Equipo, Sede, Usuario, EventoPartido, Club, Categoria } = require('../models');

const getAllPartidos = async (req, res) => {
  try {
    const partidos = await Partido.findAll({
      include: [
        {
          model: Equipo,
          as: 'equipo_local',
          include: [
            { model: Club, as: 'club' },
            { model: Categoria, as: 'categoria' }
          ]
        },
        {
          model: Equipo,
          as: 'equipo_visitante',
          include: [
            { model: Club, as: 'club' },
            { model: Categoria, as: 'categoria' }
          ]
        },
        { model: Sede, as: 'sede' },
        { model: Usuario, as: 'planillero', attributes: ['id', 'nombre_completo'] },
        { model: EventoPartido, as: 'eventos' }
      ],
      order: [['fecha_hora', 'DESC']]
    });
    res.json({ success: true, data: partidos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener partidos', error: error.message });
  }
};

const getPartidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const partido = await Partido.findByPk(id, {
      include: [
        {
          model: Equipo,
          as: 'equipo_local',
          include: [
            { model: Club, as: 'club' },
            { model: Categoria, as: 'categoria' }
          ]
        },
        {
          model: Equipo,
          as: 'equipo_visitante',
          include: [
            { model: Club, as: 'club' },
            { model: Categoria, as: 'categoria' }
          ]
        },
        { model: Sede, as: 'sede' },
        { model: Usuario, as: 'planillero', attributes: ['id', 'nombre_completo'] },
        { model: EventoPartido, as: 'eventos' }
      ]
    });
    if (!partido) return res.status(404).json({ success: false, message: 'Partido no encontrado' });
    res.json({ success: true, data: partido });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener partido', error: error.message });
  }
};

const createPartido = async (req, res) => {
  try {
    const { equipo_local_id, equipo_visitante_id, sede_id, fecha_hora, jornada, planillero_id } = req.body;

    if (!equipo_local_id || !equipo_visitante_id || !sede_id || !fecha_hora) {
      return res.status(400).json({ success: false, message: 'Campos requeridos faltantes' });
    }

    const nuevoPartido = await Partido.create({
      equipo_local_id,
      equipo_visitante_id,
      sede_id,
      fecha_hora,
      jornada,
      planillero_id,
      estado: 'PROGRAMADO'
    });

    res.status(201).json({ success: true, message: 'Partido creado exitosamente', data: nuevoPartido });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear partido', error: error.message });
  }
};

const updatePartido = async (req, res) => {
  try {
    const { id } = req.params;
    const partido = await Partido.findByPk(id);
    if (!partido) return res.status(404).json({ success: false, message: 'Partido no encontrado' });

    await partido.update(req.body);
    res.json({ success: true, message: 'Partido actualizado exitosamente', data: partido });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar partido', error: error.message });
  }
};

const deletePartido = async (req, res) => {
  try {
    const { id } = req.params;
    const partido = await Partido.findByPk(id);
    if (!partido) return res.status(404).json({ success: false, message: 'Partido no encontrado' });

    await partido.destroy();
    res.json({ success: true, message: 'Partido eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar partido', error: error.message });
  }
};

module.exports = { getAllPartidos, getPartidoById, createPartido, updatePartido, deletePartido };
