module.exports = (sequelize, DataTypes) => {
  return sequelize.define('usuarios_domicilio', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
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
    	allowNull: false,
      set: function(val) {
        this.setDataValue('direccion_habitacional', val.toUpperCase());
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