'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    static associate(models) {
      Jugador.hasMany(models.Inscripcion, {
        foreignKey: 'jugador_id',
        as: 'inscripciones'
      });
      Jugador.hasMany(models.EventoPartido, {
        foreignKey: 'jugador_id',
        as: 'eventos'
      });
    }
  }

  Jugador.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    documento_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    eps: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    foto_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugadores',
    timestamps: false
  });

  return Jugador;
};
