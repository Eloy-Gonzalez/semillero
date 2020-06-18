const db = require('../config/databases.js');

/* Model */
const Periodos = db.Periodos;

/* API PERIODOS
	@params nothing or string
	@return object
*/
exports.periodos = (req, res) => {
	console.log('func -> Periodos');
	if (req.body.params != undefined) {
		Periodos.findAll()
		.then(periodos => {
			res.status(200).json(periodos);
		});
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};