module.exports = (sequelize, DataTypes) => {
	return sequelize.define('usuarios_representante', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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