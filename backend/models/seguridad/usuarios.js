'use strict';
module.exports = (sequelize, DataTypes) => {
  var Usuarios = sequelize.define('Usuarios', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isEmail : {
          msg : 'Correo invalido'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_pregunta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'preguntas_seguridad',
        key: 'id'
      }
    },
    respuesta_seguridad: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    creado_por: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    actualizado_por: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'usuarios',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Usuarios;
};