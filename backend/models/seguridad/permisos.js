module.exports = (sequelize, DataTypes) => {
  return sequelize.define('permisos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.SMALLINT,
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
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'permisos',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
