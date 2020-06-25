const Sequelize = require('sequelize');
const config = require('./databases.json');

const db = {};
const databases = Object.keys(config.databases);
for(let i = 0; i < databases.length; i++) {
	let database = databases[i];
	let dbPath = config.databases[database].path;
	db[database] = new Sequelize( dbPath, {
		pool : config.databases[database].pool,
		sync : config.databases[database].sync,
		benchmark: true
	});
	db[database].authenticate()
	.then(() => {
		console.log('[DATABASE (%s)]: Connection has been established successfully!', database);
	}).catch(err => {
		console.error('[DATABASE (%s)]: Unable to connect to the database: %s', database, err);
	});
}

/* MODELS */
db.Categorias = require('../models/seguridad/categorias')(db['semillero'], Sequelize);
db.Estatus = require('../models/seguridad/estatus')(db['semillero'], Sequelize);
db.Periodos = require('../models/seguridad/periodos')(db['semillero'], Sequelize);
db.FasesDescripcion = require('../models/seguridad/fases_descripcion')(db['semillero'], Sequelize);
db.Fases = require('../models/seguridad/fases')(db['semillero'], Sequelize);
db.PreguntasSeguridad = require('../models/seguridad/preguntas_seguridad')(db['semillero'], Sequelize);
db.Permisos = require('../models/seguridad/permisos')(db['semillero'], Sequelize);
db.Usuarios	= require('../models/seguridad/usuarios')(db['semillero'], Sequelize);
db.UsuariosPerfil = require('../models/seguridad/usuarios_perfil')(db['semillero'], Sequelize);
db.UsuariosRepresentante = require('../models/seguridad/usuarios_representante')(db['semillero'], Sequelize);
db.UsuariosDomicilio = require('../models/seguridad/usuarios_domicilio')(db['semillero'], Sequelize);
db.UsuariosPermisos = require('../models/seguridad/usuarios_permisos')(db['semillero'], Sequelize);
db.Proyectos = require('../models/seguridad/proyectos')(db['semillero'], Sequelize);
db.ProyectosXCategorias = require('../models/seguridad/proyectos_x_categorias')(db['semillero'], Sequelize);

db.Estados = require('../models/public/estados')(db['semillero'], Sequelize);
db.Municipios = require('../models/public/municipios')(db['semillero'], Sequelize);
db.Parroquias = require('../models/public/parroquias')(db['semillero'], Sequelize);

db.Saime = require('../models/saime/saime')(db['saime'], Sequelize);

/* RELATIONS */
db.Usuarios.hasMany(db.Proyectos, { foreignKey: 'id_usuario' });
db.Proyectos.belongsTo(db.Usuarios, {  foreignKey: 'id_usuario' });

db.Estatus.hasMany(db.Proyectos, { foreignKey: 'id_estatus' });
db.Proyectos.belongsTo(db.Estatus, { foreignKey: 'id_estatus' });

db.Usuarios.hasOne(db.UsuariosPerfil, { foreignKey: 'id_usuario', targetKey: 'id_usuario', sourceKey: 'id'});
db.UsuariosPerfil.belongsTo(db.Usuarios, { foreignKey: 'id_usuario', targetKey: 'id', sourceKey: 'id_usuario'});

db.Usuarios.hasOne(db.UsuariosRepresentante, { foreignKey: 'id_usuario', targetKey: 'id_usuario', sourceKey: 'id' });
db.UsuariosRepresentante.belongsTo(db.Usuarios, { foreignKey: 'id_usuario', targetKey: 'id', sourceKey: 'id_usuario'});

db.Usuarios.hasOne(db.UsuariosDomicilio, { foreignKey: 'id_usuario', targetKey: 'id_usuario', sourceKey: 'id' });
db.UsuariosDomicilio.belongsTo(db.Usuarios, { foreignKey: 'id_usuario', targetKey: 'id', sourceKey: 'id_usuario'});

db.Usuarios.hasOne(db.UsuariosRepresentante, { foreignKey: 'id_usuario', targetKey: 'id_usuario', sourceKey: 'id' });
db.UsuariosRepresentante.belongsTo(db.Usuarios, { foreignKey: 'id_usuario', targetKey: 'id', sourceKey: 'id_usuario' });

db.UsuariosDomicilio.hasOne(db.Parroquias, { foreignKey: 'id_parroquia', targetKey: 'id_parroquia', sourceKey: 'id_parroquia' });
db.Parroquias.belongsTo(db.UsuariosDomicilio, { foreignKey: 'id_parroquia', targetKey: 'id_parroquia', sourceKey: 'id_parroquia' });

db.Periodos.hasMany(db.Fases, { foreignKey: 'id_periodo', targetKey: 'id_periodo', sourceKey: 'id'});
db.Fases.belongsTo(db.Periodos, { foreignKey: 'id_periodo', targetKey: 'id', sourceKey: 'id_periodo'});

db.Parroquias.hasOne(db.Municipios, { foreignKey: 'id_municipio', targetKey: 'id_municipio', sourceKey: 'id_municipio'});
db.Municipios.belongsTo(db.Parroquias,{ foreignKey: 'id_municipio', targetKey: 'id_municipio', sourceKey: 'id_municipio'});

db.Municipios.hasOne(db.Estados, { foreignKey: 'id_estado', targetKey: 'id_estado', sourceKey: 'id_estado' });
db.Estados.belongsTo(db.Municipios, { foreignKey: 'id_estado', targetKey: 'id_estado', sourceKey: 'id_estado' });

// Sincronización con los modelos hacia el motor de base de datos
// db['semillero'].sync({force : true});
module.exports = db;