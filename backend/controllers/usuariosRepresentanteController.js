let db = require('../config/databases.js');
let errDb = require('../helpers/errorsDb.js');

/* Model */
const UsuariosRepresentante = db.UsuariosRepresentante;
const UsuariosPerfil = db.UsuariosPerfil;

/* API GET USUARIOS REPRESENTANTES
	@params columns from database
	@return json
*/
exports.get = (req, res) => {
	console.log('func -> getUsuariosRepresentante');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		UsuariosRepresentante.findAll({
			where : conditions
		}).then(representante => {
			res.status(200).json(representante);
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

/* API UPDATE USUARIOS REPRESENTANTE
	@params columns from database
	@return json
*/
exports.update = async (req, res) => {
	console.log('func -> updateUsuariosRepresentante');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id_usuario, version, cedula } = conditions;
		if (conditions.id_usuario != undefined && conditions.actualizado_por != undefined && conditions.version != undefined) {
			delete conditions.id_usuario; delete conditions.version;
			conditions = {
				...conditions,
				version : version + 1
			};
			const t = await UsuariosRepresentante.sequelize.transaction({ autocommit : false });
			try {
				UsuariosRepresentante.update(conditions, {
					where : {
						id_usuario : id_usuario,
						version : version
					}
				}, { transaction : t }).then(async result => {
					if (result[0] > 0) {
						if (cedula != undefined) {
							await UsuariosPerfil.findOne({ where : { id_usuario : id_usuario }, attributes : ['cedula']}).then( async usuario => {
								let countHijo = usuario.dataValues.cedula.split('-');
								let cedulaPerfil = `${cedula}-${countHijo[1]}`
								await UsuariosPerfil.update({ cedula : cedulaPerfil, actualizado_por : conditions.actualizado_por }, { where : { id_usuario : id_usuario }}, { transaction : t });
							})
						}
						res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Actualización exitosa!'}});
					} else {
						res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Error al actualizar datos!'}});
					}
				})
				// PUSH
				await t.commit();
			} catch(err) {
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

				// ROLLBACK TRANSACTION ISOLATION LEVEL 1
				await t.rollback();
			}
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo \'id_usuario\', \'actualizado_por\' y \'version\' requerido!'}});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};