let db = require('../config/databases.js');
let errDb = require('../helpers/errorsDb.js');

/* Model */
const UsuariosPerfil = db.UsuariosPerfil;

/* API GET USUARIOS PERFIL
	@params columns from database
	@return json
*/
exports.get = (req, res) => {
	console.log('func -> getUsuariosPerfil');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		UsuariosPerfil.findAll({
			where : conditions
		}).then(perfil => {
			res.status(200).json(perfil);
		}).catch(err => {
			// Validation before send query on database
			if (err.name == 'SequelizeValidationError') {
				res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
			}
			// Validation after send query on database
			if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
				var { severity, code, detail } = err.parent;
				detail = errDb.errorsDb(code)
				res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
			}
		})
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API UPDATE USUARIOS PERFIL
	@params columns from database
	@return json
*/
exports.update = (req, res) => {
	console.log('func -> updateUsuariosPerfil');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id_usuario, version } = conditions;
		if (conditions.id_usuario != undefined && conditions.actualizado_por != undefined && conditions.version != undefined) {
			delete conditions.id_usuario; delete conditions.version;
			conditions = {
				...conditions,
				version : version + 1
			};

			UsuariosPerfil.update(conditions, {
				where : {
					id_usuario : id_usuario,
					version : version
				}
			}).then(result => {
				if (result[0] > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Actualización exitosa!'}});
				} else {
					res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Error al actualizar datos!'}});
				}
			}).catch(err => {
				// Validation before send query on database
				if (err.name == 'SequelizeValidationError') {
					res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
				}
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
					var { severity, code, detail } = err.parent;
					console.log(detail);
					detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
					res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
				}
			})
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo \'id_usuario\', \'actualizado_por\' y \'version\' requerido!'}});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};