module.exports = (sequelize, DataTypes) => {
  return sequelize.define('proyectos_x_categorias', {
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'proyectos',
        key: 'id'
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categorias',
        key: 'id'
      }
    },
  }, {
    tableName: 'proyectos_x_categorias',
    schema: 'seguridad',
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};
