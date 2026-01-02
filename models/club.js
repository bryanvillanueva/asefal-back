'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      Club.belongsTo(models.Usuario, {
        foreignKey: 'delegado_usuario_id',
        as: 'delegado'
      });
      Club.hasMany(models.Equipo, {
        foreignKey: 'club_id',
        as: 'equipos'
      });
    }
  }

  Club.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delegado_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Club',
    tableName: 'clubes',
    timestamps: false
  });

  return Club;
};
