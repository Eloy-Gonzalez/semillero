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
	app.get('/api/', (req,res)=>{
		res.status(200).json({title : 'Bienvenido al sistema'});
	});

	// Check user
	app.post('/api/checkuser', publicController.checkuser);

	// Registro
	app.post('/api/registro', publicController.registro);

	// Login
	app.post('/api/login', publicController.login);

	// ActivateUser
	app.post('/api/activateuser', publicController.activateuser);

	// LostPassword
	app.post('/api/recoverpassword', publicController.recoverpassword);
	app.post('/api/recoverpassword2', publicController.recoverpassword2);

	// UpdatePassword
	app.post('/api/updatepassword', rutasProtegidas.verifyToken, publicController.updatepassword);

	// Estados
	app.post('/api/estados', publicController.estados);

	// Municipios
	app.post('/api/municipios', publicController.municipios);

	// Parroquias
	app.post('/api/parroquias', publicController.parroquias);

	// Saime
	app.post('/api/saime', publicController.saime);
	
	// Categorias
	app.post('/api/categorias', categoriasController.get);
	app.post('/api/categorias/create', rutasProtegidas.verifyToken, categoriasController.create);
	app.post('/api/categorias/update', rutasProtegidas.verifyToken, categoriasController.update);
	app.post('/api/categorias/delete', rutasProtegidas.verifyToken, categoriasController.delete);
	app.post('/api/categorias/restore', rutasProtegidas.verifyToken, categoriasController.restore);

	// Estatus
	app.post('/api/estatus', estatusController.get);
	app.post('/api/estatus/create', rutasProtegidas.verifyToken, estatusController.create);
	app.post('/api/estatus/update', rutasProtegidas.verifyToken, estatusController.update);
	app.post('/api/estatus/delete', rutasProtegidas.verifyToken, estatusController.delete);
	app.post('/api/estatus/restore', rutasProtegidas.verifyToken, estatusController.restore);

	// Preguntas Seguridad
	app.post('/api/preguntas', preguntasController.get);
	app.post('/api/preguntas/create', rutasProtegidas.verifyToken, preguntasController.create);
	app.post('/api/preguntas/update', rutasProtegidas.verifyToken, preguntasController.update);
	app.post('/api/preguntas/delete', rutasProtegidas.verifyToken, preguntasController.delete);
	app.post('/api/preguntas/restore', rutasProtegidas.verifyToken, preguntasController.restore);

	// Proyectos
	app.post('/api/proyectos', proyectosController.get);
	app.post('/api/proyectos/create', rutasProtegidas.verifyToken, proyectosController.create);
	app.post('/api/proyectos/update', rutasProtegidas.verifyToken, proyectosController.update);
	app.post('/api/proyectos/delete', rutasProtegidas.verifyToken, proyectosController.delete);
	app.post('/api/proyectos/restore', rutasProtegidas.verifyToken, proyectosController.restore);

	// Periodos
	app.post('/api/periodos', periodosController.get);
	app.post('/api/periodos/create', rutasProtegidas.verifyToken, periodosController.create);
	app.post('/api/periodos/update', rutasProtegidas.verifyToken, periodosController.update);
	app.post('/api/periodos/delete', rutasProtegidas.verifyToken, periodosController.delete);
	app.post('/api/periodos/restore', rutasProtegidas.verifyToken, periodosController.restore);

	// Fases
	app.post('/api/fases', fasesController.get);
	app.post('/api/fases/create', rutasProtegidas.verifyToken, fasesController.create);
	app.post('/api/fases/update', rutasProtegidas.verifyToken, fasesController.update);
	app.post('/api/fases/delete', rutasProtegidas.verifyToken, fasesController.delete);
	app.post('/api/fases/restore', rutasProtegidas.verifyToken, fasesController.restore);

	// Fases Descripcion
	app.post('/api/fasesdescripcion', fasesdescripcionController.get);
	app.post('/api/fasesdescripcion/create', rutasProtegidas.verifyToken, fasesdescripcionController.create);
	app.post('/api/fasesdescripcion/update', rutasProtegidas.verifyToken, fasesdescripcionController.update);
	app.post('/api/fasesdescripcion/delete', rutasProtegidas.verifyToken, fasesdescripcionController.delete);
	app.post('/api/fasesdescripcion/restore', rutasProtegidas.verifyToken, fasesdescripcionController.restore);

	// Usuarios
	app.post('/api/usuarios', usuariosController.get);
	app.post('/api/usuarios/create', rutasProtegidas.verifyToken, usuariosController.create);
	app.post('/api/usuarios/update', rutasProtegidas.verifyToken, usuariosController.update);
	app.post('/api/usuarios/delete', rutasProtegidas.verifyToken, usuariosController.delete);
	app.post('/api/usuarios/restore', rutasProtegidas.verifyToken, usuariosController.restore);

	// Usuarios Perfil
	app.post('/api/usuariosperfil', rutasProtegidas.verifyToken, usuariosPerfilController.get);
	app.post('/api/usuariosperfil/update', rutasProtegidas.verifyToken, usuariosPerfilController.update);

	// Usuarios Domicilio
	app.post('/api/usuariosdomicilio', rutasProtegidas.verifyToken, usuariosDomicilioController.get);
	app.post('/api/usuariosdomicilio/update', rutasProtegidas.verifyToken, usuariosDomicilioController.update);

	// Usuarios Representante
	app.post('/api/usuariosrepresentante', rutasProtegidas.verifyToken, usuariosRepresentanteController.get);
	app.post('/api/usuariosrepresentante/update', rutasProtegidas.verifyToken, usuariosRepresentanteController.update);

	// Usuarios Permisos
	app.post('/api/usuariospermisos/create', rutasProtegidas.verifyToken, usuariosPermisosController.create);
	app.post('/api/usuariospermisos/update', rutasProtegidas.verifyToken, usuariosPermisosController.update);
	app.post('/api/usuariospermisos/delete', rutasProtegidas.verifyToken, usuariosPermisosController.delete);

	// Permisos
	app.post('/api/permisos', rutasProtegidas.verifyToken, permisosController.get);
	app.post('/api/permisos/create', rutasProtegidas.verifyToken, permisosController.create);
	app.post('/api/permisos/update', rutasProtegidas.verifyToken, permisosController.update);
	app.post('/api/permisos/delete', rutasProtegidas.verifyToken, permisosController.delete);
	app.post('/api/permisos/restore', rutasProtegidas.verifyToken, permisosController.restore);

	// TEST ROUTES
	// app.post('/test/gettoken', testController.getToken);
	// app.post('/test/generatetoken', testController.generateToken);
	// app.post('/test/generatepassword', testController.generatePassword);
	// app.post('/test/registro/usuario', testController.usuario);
	// app.post('/test/query', testController.query);
}
