module.exports = (sequelize, DataTypes) => {
  return sequelize.define('proyectos_x_categorias', {
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'proyectos_x_categorias',
    schema: 'seguridad',
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['id_proyecto', 'id_categoria']
      },
    ]
  });
};
