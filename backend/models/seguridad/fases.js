module.exports = (sequelize, DataTypes) => {
  return sequelize.define('fases', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'periodos',
        key: 'id'
      }
    },
    id_fase_descripcion: {
      type: DataTypes.INTEGER,
      allowNull: false,
       references: {
        model: 'fases_descripcion',
        key: 'id'
      }
    },
    fecha_desde: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_hasta: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    tableName: 'fases',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['id_periodo', 'id_fase_descripcion']
      }
    ]
  });
};
