const Sequelize = require('sequelize');
const config = require('./databases.json');

const db = {};
const databases = Object.keys(config.databases);
for(let i = 0; i < databases.length; i++) {
	let database = databases[i];
	let dbPath = config.databases[database].path;
	db[database] = new Sequelize( dbPath, {
		pool : config.databases[database].pool,
		sync : config.databases[database].sync
	});
	db[database].authenticate()
	.then(() => {
		console.log('[DATABASE (%s)]: Connection has been established successfully!', database);
	}).catch(err => {
		console.error('[DATABASE (%s)]: Unable to connect to the database: %s', database, err);
	});
}

// Models
db.Categorias = require('../models/seguridad/categorias')(db['semillero'], Sequelize);
db.Estatus = require('../models/seguridad/estatus')(db['semillero'], Sequelize);
db.PreguntasSeguridad = require('../models/seguridad/preguntas_seguridad')(db['semillero'], Sequelize);
db.Proyectos = require('../models/seguridad/proyectos')(db['semillero'], Sequelize);
db.ProyectosXCategorias = require('../models/seguridad/proyectos_x_categorias')(db['semillero'], Sequelize);
db.Usuarios	= require('../models/seguridad/usuarios')(db['semillero'], Sequelize);
db.UsuariosPerfil = require('../models/seguridad/usuarios_perfil')(db['semillero'], Sequelize);
db.UsuariosDomicilio = require('../models/seguridad/usuarios_domicilio')(db['semillero'], Sequelize);

module.exports = db;