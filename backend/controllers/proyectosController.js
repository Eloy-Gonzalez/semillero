let db = require('../config/databases.js');
let errDb = require('../helpers/errorsDb.js');
let nodemailer = require('nodemailer');

let userEmail = 'autogestion@mppct.gob.ve'; // sistemasmppct@gmail.com
let userPassword = '$1g3f1rrHH2020'; // sistemas12345

// Transporter without auth
var transporter = nodemailer.createTransport({
  host: '172.17.190.39',
  port: 25,
  secure: false,
	auth: {
    user: userEmail,
    pass: userPassword,
  },
  tls: {
   // do not fail on invalid certs
   rejectUnauthorized: false
  },
});

/* Model */
const Proyectos = db.Proyectos;
const ProyectosXCategorias = db.ProyectosXCategorias;

/* API GET PROYECTOS
	@params columns from database
	@return json
*/
exports.get = (req, res) => {
	console.log('func -> getProyectos');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		Proyectos.findAndCountAll({
			where : conditions,
			offset: 0, 
			limit: 10
		}).then(proyectos => {
			res.status(200).json(proyectos);
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
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API INSERT PROYECTOS
	@params columns from database
	@return json
*/
exports.create = async (req, res) => {
	console.log('func -> insertProyectos');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		if (conditions.categorias.length > 0) {
			const { categorias } = conditions;
			const t = await ProyectosXCategorias.sequelize.transaction({ autocommit : false });
			try {
				// BEGIN TRANSACTION ISOLATION LEVEL 1
				var proyecto = await Proyectos.create(conditions, { transaction : t });
				// Proyectos_x_categorias
				var data = [];
				categorias.forEach((index, value) => {
					data.push({
						id_proyecto : proyecto.dataValues.id,
						id_categoria : index
					})
				});
				await ProyectosXCategorias.bulkCreate(data, { transaction : t });
				const { id_usuario, id_estatus } = proyecto.dataValues;
				db.semillero.query("\
					SELECT e.id, e.nombre, u.username, p.primer_nombre, p.primer_apellido from seguridad.estatus as e, seguridad.usuarios as u, seguridad.usuarios_perfil as p \
					where u.id = :id_usuario and e.id = :id_estatus\
				", { replacements: { id_usuario : id_usuario, id_estatus : id_estatus }, type: db.semillero.QueryTypes.SELECT }
				).then(result => {

					var mailOptions = {
						from: userEmail,
						to: result[0].username,
						subject: 'Sistema Semillero',
						html: `<h1>Hola, ${result[0].primer_nombre} ${result[0].primer_apellido}!</h1><p>Su proyecto ha sido registrado exitosamente en el sistema con estatus: <b>${result[0].nombre}</b>, para más detalles, por favor ingrese al sistema haciendo click en el siguiente enlace: <a href="http://crs.mppct.gob.ve/login">Ingresar al sistema</a></p>`,
					};
					// transporter.sendMail(mailOptions, function(error, info){
					// 	if (!error){
					// 		res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Registro guardado exitosamente!'}});
					// 	} else {
					// 		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'ERROR 00000 Servidor de correos no responde' }})
					// 	}
					// });
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Registro guardado exitosamente!'}});
				});
				// PUSH
				await t.commit();
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
			res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Por favor, seleccione al menos 1 categoria'}});		
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});		
	}
};

/* API UPDATE PROYECTOS
	@params columns from database
	@return json
*/
exports.update = async (req, res) => {
	console.log('func -> updateProyectos');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version, categorias } = conditions;
		if (conditions.id != undefined && conditions.actualizado_por != undefined && conditions.version != undefined) {
			delete conditions.id; delete conditions.version;
			conditions = {
				...conditions,
				version : version + 1
			};
			if (conditions.categorias != undefined) {
				const t = await ProyectosXCategorias.sequelize.transaction({ autocommit : false });
				try {
					// BEGIN TRANSACTION ISOLATION LEVEL 1
					const { categorias } = conditions;
					// Proyectos_x_categorias
					var data = [];
					categorias.forEach((index, value) => {
						data.push({
							id_proyecto : id,
							id_categoria : index
						})
					});
					await Proyectos.update(conditions, {
						where : {
							id : id,
							version : version
						}
					}, { transaction : t }).then(result => {
						if (result[0] > 0) {
							console.log(result);
							// Incluir envio de email si el estatus del proyecto ha sido cambiado
							res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Actualización exitosa!'}});
						} else {
							res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Error al actualizar datos!'}});
						}
					})
					await ProyectosXCategorias.destroy({ where : { id_proyecto : id } }, { transaction : t } );
					await ProyectosXCategorias.bulkCreate(data, { transaction : t });
					// PUSH
					await t.commit();
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
				Proyectos.update(conditions, {
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
				})
			}
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo(s) \'id\', \'actualizado_por\' y \'version\' requerido!'}});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API DELETE PROYECTOS (SOFT DELETE)
	@params columns from database
	@return json
*/
exports.delete = (req, res) => {
	console.log('func -> deleteProyectos');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.version != undefined && conditions.actualizado_por != undefined) {
			delete conditions.id; delete conditions.version;
			var set = {...conditions,	borrado : true,	version : version + 1};
			conditions = {id : id, version : version};
			Proyectos.update(set, {
				where : conditions
			}).then(result => {
				if (result[0] > 0) {
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
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo(s) \'id\',  \'actualizado_por\' y \'version\' requerido!'}});			
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API RESTORE PROYECTOS (SOFT RESTORE)
	@params columns from database
	@return json
*/
exports.restore = (req, res) => {
	console.log('func -> restoreProyectos');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.version != undefined && conditions.actualizado_por != undefined) {
			delete conditions.id; delete conditions.version;
			var set = {...conditions,	borrado : false,	version : version + 1};
			conditions = {id : id, version : version};
			Proyectos.update(set, {
				where : conditions
			}).then(result => {
				if (result[0] > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'El registro ha sido restaurado exitosamente!'}});
				} else {
					res.status(200).json({ alert : { type : 'danger', title : 'Información', message : 'El registro a restaurar no existe o ya fue restaurado!'}});					
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
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo(s) \'id\',  \'actualizado_por\' y \'version\' requerido!'}});			
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};