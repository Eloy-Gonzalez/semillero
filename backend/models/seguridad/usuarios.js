module.exports = (sequelize, DataTypes) => {
  return sequelize.define('usuarios', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_pregunta: {
      type: DataTypes.INTEGER,
      allowNull: false
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
};
