module.exports = (app) => {

	// Controllers
	const publicController = require('../controllers/publicController');
	const categoriasController = require('../controllers/categoriasController');
	const estatusController = require('../controllers/estatusController');
	const preguntasController = require('../controllers/preguntasController');
	const periodosController = require('../controllers/periodosController');
	const fasesController = require('../controllers/fasesController');
	const fasesdescripcionController = require('../controllers/fasesdescripcionController');
	const proyectosController = require('../controllers/proyectosController');
	const usuariosController = require('../controllers/usuariosController');
	const usuariosPerfilController = require('../controllers/usuariosPerfilController');
	const usuariosDomicilioController = require('../controllers/usuariosDomicilioController');
	const usuariosRepresentanteController = require('../controllers/usuariosRepresentanteController');
	const permisosController = require('../controllers/permisosController');
	const usuariosPermisosController = require('../controllers/usuariosPermisosController');
	const testController = require('../controllers/testController');

	// Middleware
	const rutasProtegidas = require('../middlewares/rutasProtegidas');

	// Routes
	app.get('/', (req,res)=>{
		res.status(200).json({title : 'Bienvenido al sistema'});
	});

	// Registro
	app.post('/registro', publicController.registro);

	// Login
	app.post('/login', publicController.login);

	// ActivateUser
	app.post('/activateuser', publicController.activateuser);

	// LostPassword
	app.post('/recoverpassword', publicController.recoverpassword);
	app.post('/recoverpassword2', publicController.recoverpassword2);

	// UpdatePassword
	app.post('/updatepassword', rutasProtegidas.verifyToken, publicController.updatepassword);

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
	app.post('/categorias/delete', rutasProtegidas.verifyToken, categoriasController.delete);
	app.post('/categorias/restore', rutasProtegidas.verifyToken, categoriasController.restore);

	// Estatus
	app.post('/estatus', estatusController.get);
	app.post('/estatus/create', rutasProtegidas.verifyToken, estatusController.create);
	app.post('/estatus/update', rutasProtegidas.verifyToken, estatusController.update);
	app.post('/estatus/delete', rutasProtegidas.verifyToken, estatusController.delete);
	app.post('/estatus/restore', rutasProtegidas.verifyToken, estatusController.restore);

	// Preguntas Seguridad
	app.post('/preguntas', preguntasController.get);
	app.post('/preguntas/create', rutasProtegidas.verifyToken, preguntasController.create);
	app.post('/preguntas/update', rutasProtegidas.verifyToken, preguntasController.update);
	app.post('/preguntas/delete', rutasProtegidas.verifyToken, preguntasController.delete);
	app.post('/preguntas/restore', rutasProtegidas.verifyToken, preguntasController.restore);

	// Proyectos
	app.post('/proyectos', proyectosController.get);
	app.post('/proyectos/create', rutasProtegidas.verifyToken, proyectosController.create);
	app.post('/proyectos/update', rutasProtegidas.verifyToken, proyectosController.update);
	app.post('/proyectos/delete', rutasProtegidas.verifyToken, proyectosController.delete);
	app.post('/proyectos/restore', rutasProtegidas.verifyToken, proyectosController.restore);

	// Periodos
	app.post('/periodos', periodosController.get);
	app.post('/periodos/create', rutasProtegidas.verifyToken, periodosController.create);
	app.post('/periodos/update', rutasProtegidas.verifyToken, periodosController.update);
	app.post('/periodos/delete', rutasProtegidas.verifyToken, periodosController.delete);
	app.post('/periodos/restore', rutasProtegidas.verifyToken, periodosController.restore);

	// Fases
	app.post('/fases', fasesController.get);
	app.post('/fases/create', rutasProtegidas.verifyToken, fasesController.create);
	app.post('/fases/update', rutasProtegidas.verifyToken, fasesController.update);
	app.post('/fases/delete', rutasProtegidas.verifyToken, fasesController.delete);
	app.post('/fases/restore', rutasProtegidas.verifyToken, fasesController.restore);

	// Fases Descripcion
	app.post('/fasesdescripcion', fasesdescripcionController.get);
	app.post('/fasesdescripcion/create', rutasProtegidas.verifyToken, fasesdescripcionController.create);
	app.post('/fasesdescripcion/update', rutasProtegidas.verifyToken, fasesdescripcionController.update);
	app.post('/fasesdescripcion/delete', rutasProtegidas.verifyToken, fasesdescripcionController.delete);
	app.post('/fasesdescripcion/restore', rutasProtegidas.verifyToken, fasesdescripcionController.restore);

	// Usuarios
	app.post('/usuarios', usuariosController.get);
	app.post('/usuarios/create', rutasProtegidas.verifyToken, usuariosController.create);
	app.post('/usuarios/update', rutasProtegidas.verifyToken, usuariosController.update);
	app.post('/usuarios/delete', rutasProtegidas.verifyToken, usuariosController.delete);
	app.post('/usuarios/restore', rutasProtegidas.verifyToken, usuariosController.restore);

	// Usuarios Perfil
	app.post('/usuariosperfil', rutasProtegidas.verifyToken, usuariosPerfilController.get);
	app.post('/usuariosperfil/update', rutasProtegidas.verifyToken, usuariosPerfilController.update);

	// Usuarios Domicilio
	app.post('/usuariosdomicilio', rutasProtegidas.verifyToken, usuariosDomicilioController.get);
	app.post('/usuariosdomicilio/update', rutasProtegidas.verifyToken, usuariosDomicilioController.update);

	// Usuarios Representante
	app.post('/usuariosrepresentante', rutasProtegidas.verifyToken, usuariosRepresentanteController.get);
	app.post('/usuariosrepresentante/update', rutasProtegidas.verifyToken, usuariosRepresentanteController.update);

	// Usuarios Permisos
	app.post('/usuariospermisos/create', rutasProtegidas.verifyToken, usuariosPermisosController.create);
	app.post('/usuariospermisos/update', rutasProtegidas.verifyToken, usuariosPermisosController.update);
	app.post('/usuariospermisos/delete', rutasProtegidas.verifyToken, usuariosPermisosController.delete);

	// Permisos
	app.post('/permisos', rutasProtegidas.verifyToken, permisosController.get);
	app.post('/permisos/create', rutasProtegidas.verifyToken, permisosController.create);
	app.post('/permisos/update', rutasProtegidas.verifyToken, permisosController.update);
	app.post('/permisos/delete', rutasProtegidas.verifyToken, permisosController.delete);
	app.post('/permisos/restore', rutasProtegidas.verifyToken, permisosController.restore);

	// TEST ROUTES
	// app.post('/test/gettoken', testController.getToken);
	// app.post('/test/generatetoken', testController.generateToken);
	// app.post('/test/generatepassword', testController.generatePassword);
	// app.post('/test/registro/usuario', testController.usuario);
	// app.post('/test/query', testController.query);
}
