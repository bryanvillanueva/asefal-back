'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sede extends Model {
    static associate(models) {
      Sede.hasMany(models.Partido, {
        foreignKey: 'sede_id',
        as: 'partidos'
      });
    }
  }

  Sede.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING(50),
      defaultValue: 'Barranquilla'
    }
  }, {
    sequelize,
    modelName: 'Sede',
    tableName: 'sedes',
    timestamps: false
  });

  return Sede;
};
