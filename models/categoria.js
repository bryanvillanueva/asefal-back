'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.belongsTo(models.Torneo, {
        foreignKey: 'torneo_id',
        as: 'torneo'
      });
      Categoria.hasMany(models.Equipo, {
        foreignKey: 'categoria_id',
        as: 'equipos'
      });
    }
  }

  Categoria.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ano_nacimiento_limite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    torneo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false
  });

  return Categoria;
};
