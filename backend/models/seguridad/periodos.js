module.exports = (sequelize, DataTypes) => {
  return sequelize.define('periodos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function(val) {
        this.setDataValue('nombre', val.toUpperCase());
      }
    },
    fecha_desde: {
    	type: DataTypes.DATEONLY,
    	allowNull: false
    },
    fecha_hasta: {
    	type: DataTypes.DATEONLY,
    	allowNull: false
    },
    anio_periodo: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    letra_periodo: {
    	type: DataTypes.SMALLINT,
    	allowNull: false,
    	defaultValue: 1
    },
    observaciones: {
    	type: DataTypes.TEXT,
      set: function(val) {
        this.setDataValue('observaciones', val.toUpperCase());
      }
    },
    estado: {
    	type: DataTypes.BOOLEAN,
    	allowNull: false,
    	defaultValue: true
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
    borrado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'periodos',
    schema: 'seguridad',
    version: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
