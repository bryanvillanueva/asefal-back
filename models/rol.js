'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      // Un rol tiene muchos usuarios
      Rol.hasMany(models.Usuario, {
        foreignKey: 'rol_id',
        as: 'usuarios'
      });
    }
  }

  Rol.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [['ADMIN', 'DELEGADO', 'PLANILLERO', 'ARBITRO', 'VEEDOR']]
      }
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    timestamps: false
  });

  return Rol;
};
