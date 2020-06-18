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
      allowNull: false
    },
    id_fase_descripcion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_fin: {
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
  });
};
