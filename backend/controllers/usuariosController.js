let db = require('../config/databases.js');
let bcrypt = require('bcryptjs');

/* Model */
const Usuarios = db.Usuarios;
const UsuariosPerfil = db.UsuariosPerfil;
const UsuariosDomicilio = db.UsuariosDomicilio;
const UsuariosRepresentante = db.UsuariosRepresentante;
const Estados = db.Estados;
const Municipios = db.Municipios;
const Parroquias = db.Parroquias;
const Proyectos = db.Proyectos;
const Estatus = db.Estatus;

/* API GET USUARIOS
	@params columns from database
	@return json
*/
exports.get = (req, res) => {
	console.log('func -> getUsuarios');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		Usuarios.findAll({
			where: conditions,
			include: [
				{ model : UsuariosPerfil },
				{ model : UsuariosRepresentante },
				{ 
					model: UsuariosDomicilio, include: [{ 
						model: Parroquias, required: true, attributes: ['id_parroquia', 'nombre'], include: [{
							model: Municipios, required: true,  attributes: ['id_municipio', 'nombre'], include: [{
								model: Estados, required: true, attributes: ['id_estado', 'nombre'] 
							}]
						}]
					}] 
				},
				{ model: Proyectos, required: true, include: [ { model : Estatus, required: true } ]}
			]
			}).then(usuarios => {
		  	res.status(200).json(usuarios)
		}).catch(err => {
			console.log(err);
			if (err.name == 'SequelizeEagerLoadingError') {
				res.status(200).json({ alert : { type: 'danger', title : 'Atención', message: 'Error EagerLoading Relations Models'}});
			} else {
				const { severity, code, hint } = err.parent;
				res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${hint}`}});
			}
		})
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API INSERT USUARIOS
	@params columns from database
	@return json
*/
exports.create = (req, res) => {
	console.log('func -> insertUsuarios');
	if (req.body.params != undefined) {
		const { password } = req.body.params;
		var passwordHashed = bcrypt.hashSync(password, 8);
		var conditions = {
			...req.body.params,
			password : passwordHashed
		};

		Usuarios.create(conditions)
		.then(response => {
			res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Registro guardado exitosamente!'}});
		}).catch(err => {
				// Validation before send query on database
				if (err.name == 'SequelizeValidationError') {
					res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
				}
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError') {
					const { severity, code, detail } = err.parent;
					res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
				}
		})
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});		
	}
};

/* API UPDATE USUARIOS
	@params columns from database
	@return json
*/
exports.update = (req, res) => {
	console.log('func -> updateUsuarios');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { password } = req.body.params;
		if (password != undefined) {
			var passwordHashed = bcrypt.hashSync(password, 8);
			conditions= { 
				...conditions, 
				password : passwordHashed 
			};
		}
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.actualizado_por != undefined && conditions.version != undefined) {
			delete conditions.id; delete conditions.version;
			conditions = {
				...conditions,
				version : version + 1
			};
			Usuarios.update(conditions, {
				where : {
					id : id,
					version : version
				}
			}).then(result => {
				if (result[0] > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Actualización exitosa!'}});
				} else {
					res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Error al actualizar datos!'}});
				}
			}).catch(err => {
				const { severity, code, hint } = err.parent;
				res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${hint}`}});
			})
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo \'id\', \'actualizado_por\' y \'version\' requerido!'}});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API DELETE USUARIOS (SOFT DELETE)
	@params columns from database
	@return json
*/
exports.delete = (req, res) => {
	console.log('func -> deleteUsuarios');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.version != undefined && conditions.actualizado_por != undefined) {
			delete conditions.id; delete conditions.version;
			var set = {...conditions,	borrado : true,	version : version + 1};
			conditions = {id : id, version : version};
			Usuarios.update(set, {
				where : conditions
			}).then(result => {
				if (result[0] > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'El registro ha sido eliminado exitosamente!'}});
				} else {
					res.status(200).json({ alert : { type : 'danger', title : 'Información', message : 'El registro a eliminar no existe o ya fue eliminado!'}});					
				}
			}).catch(err => {
				res.status(200).json(err);
			})
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo(s) \'id\',  \'actualizado_por\' y \'version\' requerido!'}});			
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API RESTORE USUARIOS (SOFT RESTORE)
	@params columns from database
	@return json
*/
exports.restore = (req, res) => {
	console.log('func -> restoreUsuarios');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.version != undefined && conditions.actualizado_por != undefined) {
			delete conditions.id; delete conditions.version;
			var set = {...conditions,	borrado : false,	version : version + 1};
			conditions = {id : id, version : version};
			Usuarios.update(set, {
				where : conditions
			}).then(result => {
				if (result[0] > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'El registro ha sido restaurado exitosamente!'}});
				} else {
					res.status(200).json({ alert : { type : 'danger', title : 'Información', message : 'El registro a restaurar no existe o ya fue restaurado!'}});					
				}
			}).catch(err => {
				res.status(200).json(err);
			})
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo(s) \'id\',  \'actualizado_por\' y \'version\' requerido!'}});			
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};