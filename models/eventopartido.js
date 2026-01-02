'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventoPartido extends Model {
    static associate(models) {
      EventoPartido.belongsTo(models.Partido, {
        foreignKey: 'partido_id',
        as: 'partido'
      });
      EventoPartido.belongsTo(models.Jugador, {
        foreignKey: 'jugador_id',
        as: 'jugador'
      });
      EventoPartido.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
        as: 'equipo'
      });
    }
  }

  EventoPartido.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    partido_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jugador_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo_evento: {
      type: DataTypes.ENUM('GOL', 'TARJETA_AMARILLA', 'TARJETA_ROJA', 'CAMBIO_ENTRA', 'CAMBIO_SALE'),
      allowNull: false
    },
    minuto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    observacion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'EventoPartido',
    tableName: 'eventos_partido',
    timestamps: false
  });

  return EventoPartido;
};
