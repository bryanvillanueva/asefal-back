'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inscripcion extends Model {
    static associate(models) {
      Inscripcion.belongsTo(models.Jugador, {
        foreignKey: 'jugador_id',
        as: 'jugador'
      });
      Inscripcion.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
        as: 'equipo'
      });
    }
  }

  Inscripcion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    jugador_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numero_camiseta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    posicion: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    validado_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Inscripcion',
    tableName: 'inscripciones',
    timestamps: false
  });

  return Inscripcion;
};
