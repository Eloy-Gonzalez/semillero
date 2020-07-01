let db = require('../config/databases.js');
let errDb = require('../helpers/errorsDb.js');

/* Model */
const UsuariosPermisos = db.UsuariosPermisos;

/* API INSERT USUARIOS PERMISOS
	@params columns from database
	@return json
*/
exports.create = async (req, res) => {
	console.log('func -> insertUsuariosPermisos');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		const { id_usuario, permisos } = conditions;
		if (id_usuario != undefined && permisos != undefined) {
			if (permisos.length > 0) {
				const t = await UsuariosPermisos.sequelize.transaction({ autocommit : false });
				try {
					// Usuarios Permisos
					var data = [];
					permisos.forEach((index, value) => {
						data.push({
							id_usuario : id_usuario,
							id_permiso : index
						})
					});
					await UsuariosPermisos.bulkCreate(data, { transaction : t });
					// PUSH
					await t.commit();
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Registro guardado exitosamente!'}});
				} catch(err) {
					// ROLLBACK TRANSACTION ISOLATION LEVEL 1
					await t.rollback();
					// Validation before send query on database
					if (err.name == 'SequelizeValidationError') {
						res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
					}
					// Validation after send query on database
					if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
						var { severity, code, detail } = err.parent;
						detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
						res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
					}
				}
			} else {
				res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Por favor, seleccione al menos 1 permiso'}});		
			}
		} else {
			res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Atributos \'id_usuario\' y \'permisos\' requeridos'}})
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});		
	}
};

/* API UPDATE USUARIOS PERMISOS
	@params columns from database
	@return json
*/
exports.update = async (req, res) => {
	console.log('func -> updateUsuariosPermisos');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id_usuario, permisos } = conditions;
		if (id_usuario != undefined && permisos != undefined) {
			if (permisos.length > 0) {
				const t = await UsuariosPermisos.sequelize.transaction({ autocommit : false });
				try {
					// BEGIN TRANSACTION ISOLATION LEVEL 1
					// Usuarios Permisos
					var data = [];
					permisos.forEach((index, value) => {
						data.push({
							id_usuario : id_usuario,
							id_permiso : index
						})
					});

					await UsuariosPermisos.destroy({ where : { id_usuario : id_usuario } }, { transaction : t } );
					await UsuariosPermisos.bulkCreate(data, { transaction : t });
					// PUSH
					await t.commit();
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Actualización exitosa!'}});
				}catch(err) {
					// ROLLBACK TRANSACTION ISOLATION LEVEL 1
					await t.rollback();
					// Validation before send query on database
					if (err.name == 'SequelizeValidationError') {
						res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
					}
					// Validation after send query on database
					if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
						var { severity, code, detail } = err.parent;
						detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
						res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
					}
				}
			} else {
				res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Por favor, seleccione al menos 1 permiso'}});						
			}
		} else {
			res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Atributos \'id_usuario\' y \'permisos\' requeridos'}})
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API DELETE USUARIOS PERMISOS
	@params columns from database
	@return json
*/
exports.delete = (req, res) => {
	console.log('func -> deleteUsuariosPermisos');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id_usuario } = conditions;
		if (id_usuario != undefined) {
			UsuariosPermisos.destroy({
				where : conditions
			}).then(result => {
				console.log(result);
				if (result > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'El registro ha sido eliminado exitosamente!'}});
				} else {
					res.status(200).json({ alert : { type : 'danger', title : 'Información', message : 'El registro a eliminar no existe o ya fue eliminado!'}});					
				}
			}).catch(err => {
				// Validation before send query on database
				if (err.name == 'SequelizeValidationError') {
					res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
				}
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
					var { severity, code, detail } = err.parent;
					detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
					res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
				}
			})
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo(s) \'id_usuario\' requerido!'}});			
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};
