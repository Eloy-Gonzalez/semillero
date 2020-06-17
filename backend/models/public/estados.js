module.exports = (sequelize, DataTypes) => {
  return sequelize.define('estados', {
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    abreviatura: {
      type: DataTypes.STRING
    },
    cod_estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_pais: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'estados',
    schema: 'public',
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
