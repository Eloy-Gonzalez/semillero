module.exports = (sequelize, DataTypes) => {
	return sequelize.define('usuarios_representante', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    cedula: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    primer_nombre: {
    	type: DataTypes.STRING,
    	allowNull: false,
      set: function(val) {
        this.setDataValue('primer_nombre', val.toUpperCase());
      }
    },
    segundo_nombre: {
    	type: DataTypes.STRING,
    	allowNull: false,
      set: function(val) {
        this.setDataValue('segundo_nombre', val.toUpperCase());
      }
    },
    primer_apellido: {
    	type: DataTypes.STRING,
    	allowNull: false,
      set: function(val) {
        this.setDataValue('primer_apellido', val.toUpperCase());
      }
    },
    segundo_apellido: {
    	type: DataTypes.STRING,
    	allowNull: false,
      set: function(val) {
        this.setDataValue('segundo_apellido', val.toUpperCase());
      }
    },
    genero: {
    	type: DataTypes.CHAR(1),
    	allowNull: false
    },
    fecha_nacimiento: {
    	type: DataTypes.DATEONLY,
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
    tableName: 'usuarios_representante',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
}