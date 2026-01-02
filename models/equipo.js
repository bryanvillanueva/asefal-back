'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    static associate(models) {
      Equipo.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club'
      });
      Equipo.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id',
        as: 'categoria'
      });
      Equipo.hasMany(models.Inscripcion, {
        foreignKey: 'equipo_id',
        as: 'inscripciones'
      });
      Equipo.hasMany(models.Partido, {
        foreignKey: 'equipo_local_id',
        as: 'partidos_local'
      });
      Equipo.hasMany(models.Partido, {
        foreignKey: 'equipo_visitante_id',
        as: 'partidos_visitante'
      });
      Equipo.hasMany(models.EventoPartido, {
        foreignKey: 'equipo_id',
        as: 'eventos'
      });
    }
  }

  Equipo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre_equipo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    grupo: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Equipo',
    tableName: 'equipos',
    timestamps: false
  });

  return Equipo;
};
