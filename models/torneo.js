'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Torneo extends Model {
    static associate(models) {
      Torneo.hasMany(models.Categoria, {
        foreignKey: 'torneo_id',
        as: 'categorias'
      });
    }
  }

  Torneo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('CREADO', 'EN_JUEGO', 'FINALIZADO'),
      defaultValue: 'CREADO'
    }
  }, {
    sequelize,
    modelName: 'Torneo',
    tableName: 'torneos',
    timestamps: false
  });

  return Torneo;
};
