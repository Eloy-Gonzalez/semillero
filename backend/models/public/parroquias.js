module.exports = (sequelize, DataTypes) => {
  return sequelize.define('parroquias', {
    id_parroquia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    abreviatura: {
      type: DataTypes.STRING
    },
    cod_parroquia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'parroquias',
    schema: 'public',
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
