module.exports = (sequelize, DataTypes) => {
  return sequelize.define('usuarios_permisos', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    id_permiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permisos',
        key: 'id'
      }
    },
  }, {
    tableName: 'usuarios_permisos',
    schema: 'seguridad',
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};
