let db = require('../config/databases.js');
let errDb = require('../helpers/errorsDb.js');

/* Model */
const Estatus = db.Estatus;

/* API GET ESTATUS
	@params columns from database
	@return json
*/
exports.get = (req, res) => {
	console.log('func -> getEstatus');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		Estatus.findAll({
			where : conditions
		}).then(estatus => {
			res.status(200).json(estatus);
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

/* API INSERT ESTATUS
	@params columns from database
	@return json
*/
exports.create = (req, res) => {
	console.log('func -> insertEstatus');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		Estatus.create(conditions)
		.then(response => {
			res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Registro guardado exitosamente!'}});
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



/* API UPDATE ESTATUS
	@params columns from database
	@return json
*/
exports.update = (req, res) => {
	console.log('func -> updateEstatus');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.actualizado_por != undefined && conditions.version != undefined) {
			delete conditions.id; delete conditions.version;
			conditions = {
				...conditions,
				version : version + 1
			};
			Estatus.update(conditions, {
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
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo \'id\', \'actualizado_por\' y \'version\' requerido!'}});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API DELETE ESTATUS (SOFT DELETE)
	@params columns from database
	@return json
*/
exports.delete = (req, res) => {
	console.log('func -> deleteEstatus');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.version != undefined && conditions.actualizado_por != undefined) {
			delete conditions.id; delete conditions.version;
			var set = {...conditions,	borrado : true,	version : version + 1};
			conditions = {id : id, version : version};
			Estatus.update(set, {
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

/* API RESTORE ESTATUS (SOFT RESTORE)
	@params columns from database
	@return json
*/
exports.restore = (req, res) => {
	console.log('func -> restoreEstatus');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.version != undefined && conditions.actualizado_por != undefined) {
			delete conditions.id; delete conditions.version;
			var set = {...conditions,	borrado : false,	version : version + 1};
			conditions = {id : id, version : version};
			Estatus.update(set, {
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
}
