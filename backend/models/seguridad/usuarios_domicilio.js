module.exports = (sequelize, DataTypes) => {
  return sequelize.define('usuarios_domicilio', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    telefono_habitacional: {
    	type: DataTypes.STRING,
        allowNull: true
    },
    telefono_personal: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    id_parroquia: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    direccion_habitacional: {
    	type: DataTypes.TEXT,
    	allowNull: false
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'usuarios_domicilio',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
}