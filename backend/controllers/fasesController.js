let db = require('../config/databases.js');

/* Model */
const Fases = db.Fases;

/* API GET FASES
	@params columns from database
	@return json
*/
exports.get = (req, res) => {
	console.log('func -> getFases');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		Fases.findAll({
			where : conditions
		}).then(fases => {
			res.status(200).json(fases);
		}).catch(err => {
			const { severity, code, hint } = err.parent;
			res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${hint}`}});
		})
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API INSERT FASES
	@params columns from database
	@return json
*/
exports.create = (req, res) => {
	console.log('func -> insertFases');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		Fases.create(conditions)
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

/* API UPDATE FASES
	@params columns from database
	@return json
*/
exports.update = (req, res) => {
	console.log('func -> updateFases');
	if (req.body.params != undefined) {
		var conditions = req.body.params;
		const { id, version } = conditions;
		if (conditions.id != undefined && conditions.version != undefined) {
			delete conditions.id; delete conditions.version;
			conditions = {
				...conditions,
				version : version + 1
			};
			Fases.update(conditions, {
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
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo \'id\' y \'version\' requerido!'}});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API DELETE FASES
	@params columns from database
	@return json
*/
exports.delete = (req, res) => {
	console.log('func -> deleteFases');
	if (req.body.params != undefined) {
		const conditions = req.body.params;
		if (conditions.id != undefined && conditions.version != undefined) {
			Fases.destroy({
				where : conditions
			}).then(result => {
				if (result) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'El registro ha sido eliminado exitosamente!'}});
				} else {
					res.status(200).json({ alert : { type : 'danger', title : 'Información', message : 'El registro a eliminar no existe o ya fue eliminado!'}});					
				}
			}).catch(err => {
				res.status(200).json(err);
			})
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Atributo \'id\' y \'version\' requerido!'}});			
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};