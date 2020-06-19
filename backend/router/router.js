module.exports = (app) => {

	// Controllers
	const publicController = require('../controllers/publicController');
	const privateController = require('../controllers/privateController');
	const categoriasController = require('../controllers/categoriasController');
	const estatusController = require('../controllers/estatusController');
	const preguntasController = require('../controllers/preguntasController');
	const periodosController = require('../controllers/periodosController');
	const fasesController = require('../controllers/fasesController');
	const fasesdescripcionController = require('../controllers/fasesdescripcionController');
	//const testController = require('../controllers/testController');

	// Middleware
	const rutasProtegidas = require('../middlewares/rutasProtegidas');

	// Routes
	app.get('/', (req,res)=>{
		res.status(200).json({title : 'Bienvenido al sistema'});
	});

	// Register
	app.post('/registro', publicController.register);

	// Login
	app.post('/login', publicController.login);

	// LostPassword
	//app.post('/recoverpassword', publicController.recoverpassword);

	// UpdatePassword
	//app.post('/updatepassword', rutasProtegidas.verifyToken, publicController.updatepassword);

	// Estados
	app.post('/estados', publicController.estados);

	// Municipios
	app.post('/municipios', publicController.municipios);

	// Parroquias
	app.post('/parroquias', publicController.parroquias);

	// Saime
	app.post('/saime', publicController.saime);
	
	// Categorias
	app.post('/categorias', categoriasController.get);
	app.post('/categorias/create', rutasProtegidas.verifyToken, categoriasController.create);
	app.post('/categorias/update', rutasProtegidas.verifyToken, categoriasController.update);
	app.post('/categorias/delete',rutasProtegidas.verifyToken, categoriasController.delete);

	// Estatus
	app.post('/estatus', estatusController.get);
	app.post('/estatus/create', rutasProtegidas.verifyToken, estatusController.create);
	app.post('/estatus/update', rutasProtegidas.verifyToken, estatusController.update);
	app.post('/estatus/delete', rutasProtegidas.verifyToken, estatusController.delete);

	// Preguntas Seguridad
	app.post('/preguntas', preguntasController.get);
	app.post('/preguntas/create', rutasProtegidas.verifyToken, preguntasController.create);
	app.post('/preguntas/update', rutasProtegidas.verifyToken, preguntasController.update);
	app.post('/preguntas/delete', rutasProtegidas.verifyToken, preguntasController.delete);

	// Proyectos
	app.post('/proyectos', publicController.proyectos);

	// Periodos
	app.post('/periodos', periodosController.get);
	app.post('/periodos/create', rutasProtegidas.verifyToken, periodosController.create);
	app.post('/periodos/update', rutasProtegidas.verifyToken, periodosController.update);
	app.post('/periodos/delete', rutasProtegidas.verifyToken, periodosController.delete);

	// Fases
	app.post('/fases', fasesController.get);
	app.post('/fases/create', rutasProtegidas.verifyToken, fasesController.create);
	app.post('/fases/update', rutasProtegidas.verifyToken, fasesController.update);
	app.post('/fases/delete', rutasProtegidas.verifyToken, fasesController.delete);

	// Fases Descripcion
	app.post('/fasesdescripcion', fasesdescripcionController.get);
	app.post('/fasesdescripcion/create', rutasProtegidas.verifyToken, fasesdescripcionController.create);
	app.post('/fasesdescripcion/update', rutasProtegidas.verifyToken, fasesdescripcionController.update);
	app.post('/fasesdescripcion/delete', rutasProtegidas.verifyToken, fasesdescripcionController.delete);

	// TEST ROUTES
	// app.post('/test/gettoken', testController.getToken);
	// app.post('/test/generatetoken', testController.generateToken);
	// app.post('/test/generatepassword', testController.generatePassword);
	// app.post('/test/registro/usuario', testController.usuario);
	// app.post('/test/proyectosmasivo', testController.insertProyectosMasivo);
}
