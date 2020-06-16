module.exports = (sequelize, DataTypes) => {
	 return sequelize.define('usuarios_perfil', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cedula: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    primer_nombre: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    segundo_nombre: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    primer_apellido: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    segundo_apellido: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    genero: {
    	type: DataTypes.CHAR(1),
    	allowNull: false
    },
    fecha_nacimiento: {
    	type: DataTypes.DATE,
    	allowNull: false
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'usuarios_perfil',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
}