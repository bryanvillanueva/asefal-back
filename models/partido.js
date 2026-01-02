'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Partido extends Model {
    static associate(models) {
      Partido.belongsTo(models.Equipo, {
        foreignKey: 'equipo_local_id',
        as: 'equipo_local'
      });
      Partido.belongsTo(models.Equipo, {
        foreignKey: 'equipo_visitante_id',
        as: 'equipo_visitante'
      });
      Partido.belongsTo(models.Sede, {
        foreignKey: 'sede_id',
        as: 'sede'
      });
      Partido.belongsTo(models.Usuario, {
        foreignKey: 'planillero_id',
        as: 'planillero'
      });
      Partido.hasMany(models.EventoPartido, {
        foreignKey: 'partido_id',
        as: 'eventos'
      });
    }
  }

  Partido.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    equipo_local_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipo_visitante_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sede_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('PROGRAMADO', 'EN_JUEGO', 'FINALIZADO', 'SUSPENDIDO'),
      defaultValue: 'PROGRAMADO'
    },
    goles_local: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    goles_visitante: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    jornada: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    planillero_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Partido',
    tableName: 'partidos',
    timestamps: false
  });

  return Partido;
};
