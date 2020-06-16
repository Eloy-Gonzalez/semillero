module.exports = (app) => {

	// Controllers
	const publicController = require('../controllers/publicController');
	//const privateController = require('../controllers/privateController');
	const testController = require('../controllers/testController');

	// Middleware
	const rutasProtegidas = require('../middlewares/rutasProtegidas');

	// Routes
	app.get('/', (req,res)=>{
		res.status(200).json({title : 'Bienvenido al sistema'});
	});

	// Register
	app.post('/register', publicController.register);

	// Login
	app.post('/login', publicController.login);

	// LostPassword
	//app.post('/recoverpassword', publicController.recoverpassword);

	// UpdatePassword
	//app.post('/updatepassword', rutasProtegidas.verifyToken, publicController.updatepassword);

	// Paises
	app.post('/paises', publicController.paises);

	// Estados
	app.post('/estados', publicController.estados);

	// Municipios
	app.post('/municipios', publicController.municipios);

	// Parroquias
	app.post('/parroquias', publicController.parroquias);

	// Categorias
	app.post('/categorias', publicController.categorias);

	// Estatus
	app.post('/estatus', publicController.estatus);

	// Preguntas Seguridad
	app.post('/preguntas', publicController.preguntas);

	// // Proyectos
	app.post('/proyectos', publicController.proyectos);

	// TEST ROUTES
	// app.post('/test/gettoken', testController.getToken);
	// app.post('/test/generatetoken', testController.generateToken);
	app.post('/test/generatepassword', testController.generatePassword);
	app.post('/test/registro/usuario', testController.usuario);
}
