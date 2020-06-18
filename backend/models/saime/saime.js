module.exports = (sequelize, DataTypes) => {
  return sequelize.define('saime', {
    cedula: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    pais_origen: {
      type: DataTypes.STRING
    },
    nacionalidad: {
      type: DataTypes.STRING
    },
    primer_nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segundo_nombre: {
      type: DataTypes.STRING
    },
    primer_apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segundo_apellido: {
      type: DataTypes.STRING
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naturalizado: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    tableName: 'saime',
    schema: 'saime',
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
