let db = require('../config/databases.js');
let errDb = require('../helpers/errorsDb.js');
let jwt  = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

/* Model */
const Usuarios = db.Usuarios;
const UsuariosPerfil = db.UsuariosPerfil;
const UsuariosDomicilio = db.UsuariosDomicilio;
const UsuariosRepresentante = db.UsuariosRepresentante;
const Estados = db.Estados;
const Municipios = db.Municipios;
const Parroquias = db.Parroquias;
const Proyectos = db.Proyectos;
const ProyectosXCategorias = db.ProyectosXCategorias;
const Categorias = db.Categorias;
const Permisos = db.Permisos;
const UsuariosPermisos = db.UsuariosPermisos;
const Periodos = db.Periodos;
const Fases = db.Fases;
const Estatus = db.Estatus;

/* Faker */
let faker = require('faker');
faker.locale = "es";

exports.usuario = async (req, res, next) => {
	// USUARIO
	const username = faker.internet.email();
	const password = '123456';
	const id_pregunta = 1;
	const respuesta_seguridad = 'MUÑECA';

	// USUARIO DOMICILIO
	const telefono_habitacional = faker.random.number(9999999999999);
	const telefono_personal = faker.random.number(9999999999999);
	const id_parroquia = faker.random.number(1137);
	const direccion_habitacional = faker.address.streetAddress();

	// USUARIO PERFIL
	const cedula = faker.random.arrayElement(['', faker.random.number(99999999)]);
	console.log(cedula);

	const primer_nombre = faker.name.firstName();
	const segundo_nombre = faker.name.firstName();
	const primer_apellido = faker.name.lastName();
	const segundo_apellido = faker.name.lastName();
	const genero = faker.random.arrayElement(['M', 'F']);
	const fecha_nacimiento = '2000-01-01';

	// USUARIO REPRESENTANTE
	const cedula_representante = faker.random.number(99999999);
	const primer_nombre_representante = faker.name.firstName();
	const segundo_nombre_representante = faker.name.firstName();
	const primer_apellido_representante = faker.name.lastName();
	const segundo_apellido_representante = faker.name.lastName();
	const genero_representante = faker.random.arrayElement(['M', 'F']);
	const fecha_nacimiento_representante = '2000-01-01';

	Usuarios.count({ where : { username : username }}).then(async user => {
		if (!user) {
			var passwordHashed = bcrypt.hashSync(password, 8);
				// Usuarios
				Usuarios.create({
					username: username,
					password: passwordHashed,
					id_pregunta: id_pregunta,
					respuesta_seguridad : respuesta_seguridad
				}).then(user => {
					// Usuarios Domicilio
					UsuariosDomicilio.create({
						id_usuario : user.dataValues.id,
						telefono_habitacional : telefono_habitacional,
						telefono_personal : telefono_personal,
						id_parroquia : id_parroquia,
						direccion_habitacional : direccion_habitacional,
					}).then( async user2 => {
						if (cedula == undefined || cedula == '' || cedula == null) {
							// Usuarios Representante
							await UsuariosRepresentante.create({
								id_usuario : user.dataValues.id,
								cedula : cedula_representante,
		  					primer_nombre : primer_nombre_representante,
		  					segundo_nombre : segundo_nombre_representante,
							  primer_apellido : primer_apellido_representante,
							  segundo_apellido : segundo_apellido_representante,
		  					genero : genero_representante,
							  fecha_nacimiento : fecha_nacimiento_representante
							}).catch(err => {
								// Validation before send query on database
								if (err.name == 'SequelizeValidationError') {
									res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
								}
								if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
									var { severity, code, detail } = err.parent;
									detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
									res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
								}
							})
						}

						var cedulaHijo;

						if (cedula == undefined || cedula == '' || cedula == null) {
							// Usuarios Perfil
							UsuariosRepresentante.count({ where : {
								cedula : cedula_representante
							}}).then(count => {
								cedulaHijo = `${cedula_representante}-${count}`;
								console.log(cedulaHijo);
								console.log(count);
								// Usuarios Perfil
								UsuariosPerfil.create({
									id_usuario : user.dataValues.id,
									cedula : cedulaHijo,
			  					primer_nombre : primer_nombre,
			  					segundo_nombre : segundo_nombre,
								  primer_apellido : primer_apellido,
								  segundo_apellido : segundo_apellido,
			  					genero : genero,
								  fecha_nacimiento : fecha_nacimiento,
								}).then(usuario => {
									res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario registrado éxitosamente!'} });
								}).catch(err => {
									// Validation before send query on database
									if (err.name == 'SequelizeValidationError') {
										res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
									}
									if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
										var { severity, code, detail } = err.parent;
										detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
										res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
									}
								})
							}).catch(err => {
								// Validation before send query on database
								if (err.name == 'SequelizeValidationError') {
									res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
								}
								if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
									var { severity, code, detail } = err.parent;
									detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
									res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
								}
							})
						} else {
							cedulaHijo = cedula;

														// Usuarios Perfil
						UsuariosPerfil.create({
							id_usuario : user.dataValues.id,
							cedula : cedulaHijo,
	  					primer_nombre : primer_nombre,
	  					segundo_nombre : segundo_nombre,
						  primer_apellido : primer_apellido,
						  segundo_apellido : segundo_apellido,
	  					genero : genero,
						  fecha_nacimiento : fecha_nacimiento,
						}).then(usuario => {
							res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario registrado éxitosamente!'} });
						}).catch(err => {
							// Validation before send query on database
							if (err.name == 'SequelizeValidationError') {
								res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
							}
							if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
								var { severity, code, detail } = err.parent;
								detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
								res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
							}
						})
						}
					})
				}).catch(err => {
					// Validation before send query on database
					if (err.name == 'SequelizeValidationError') {
						res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
					}
					if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
						var { severity, code, detail } = err.parent;
						detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
						res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
					}
				})
		} else {
			res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Usted ya posee un usuario en el sistema!'} });
		}
	});
};

exports.getToken = (req, res) => {
	console.log(req.headers['x-mppct-token']);
};

exports.generateToken = (req, res) => {
	console.log('func -> Test generate Token');
	var payload = {
		fakeData : 'test'
	}
	const token = jwt.sign(payload, require('../config').key, {
		expiresIn: '1h'
	});
	res.status(200).json({ token : token })
}

exports.generatePassword = (req, res) => {
	console.log('func -> Test generate Password');
	var password = '123456';
	if (req.body.password != undefined) {
		password = req.body.password
	}
	password = bcrypt.hashSync(password, 8);
	res.status(200).json({
		password : password
	})
}

exports.query = (req, res) => {
	console.clear();
	Usuarios.findOne({
		include: [
			{ model : UsuariosPerfil, required : false },
			{ model : UsuariosRepresentante, required : false },
			{ 
				model: UsuariosDomicilio, required : true, include: [{ 
					model: Parroquias, required: true, attributes: ['id_parroquia', 'nombre'], include: [{
						model: Municipios, required: true,  attributes: ['id_municipio', 'nombre'], include: [{
							model: Estados, required: true, attributes: ['id_estado', 'nombre'] 
						}]
					}]
				}] 
			},
			{ model: Proyectos, required : false, include: [ 
				{ model : Estatus, required: false, attributes : ['id', 'nombre'] },
				{ model : Categorias, as :'Categorias', required : false }
			]},
			{ model: UsuariosPermisos, as : 'Permisos', required : false, attributes: ['id_permiso'], include: [
				{ model : Permisos, as : 'permiso', required : false, attributes: ['nombre', 'tipo']}
			]}
		],
		where : { username : 'egonzalez2240@gmail.com' }
	})
	.then(usuarios => {
	  	res.status(200).json(usuarios);
	}).catch(err => {
		console.log(err);
	})
}