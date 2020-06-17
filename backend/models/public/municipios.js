module.exports = (sequelize, DataTypes) => {
  return sequelize.define('municipios', {
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    abreviatura: {
      type: DataTypes.STRING
    },
    cod_municipio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'municipios',
    schema: 'public',
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
