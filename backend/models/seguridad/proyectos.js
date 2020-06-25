'use strict';
module.exports = (sequelize, DataTypes) => {
  var Proyectos = sequelize.define('Proyectos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey : true
    },
    id_usuario: {
      field: 'id_usuario',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id"
      }
    },
    id_periodo: {
      field: 'id_periodo',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'periodos',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function(val) {
        this.setDataValue('nombre', val.toUpperCase());
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      set: function(val) {
        this.setDataValue('descripcion', val.toUpperCase());
      }
    },
    url_video: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
      validate: {
        isUrl : {
          msg : 'La url del video no tiene formato válido!'
        },
      }
    },
    id_estatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'estatus',
        key: 'id'
      }
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
    tableName: 'proyectos',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['nombre', 'url_video']
      }
    ]
  });
  return Proyectos;
};