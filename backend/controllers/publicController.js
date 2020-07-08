let db = require('../config/databases.js');
let errDb = require('../helpers/errorsDb.js');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
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

const Saime = db.Saime;

/* API REGISTRO
	@return JSON
	@tested true
*/
exports.registro = (req, res, next) => {
	console.log('func -> Register');
	if (req.body.params != undefined) {
		const { 
			username, 
			password, 
			id_pregunta, 
			respuesta_seguridad, 
			cedula,
			primer_nombre,
			segundo_nombre,
			primer_apellido,
			segundo_apellido,
			genero,
			fecha_nacimiento,
			cedula_representante,
			primer_nombre_representante,
			segundo_nombre_representante,
			primer_apellido_representante,
			segundo_apellido_representante,
			genero_representante,
			fecha_nacimiento_representante,
			telefono_habitacional,
			telefono_personal,
			id_parroquia,
			direccion_habitacional,
 		} = req.body.params;
		Usuarios.count({ where : { username : username }}).then(async user => {
			if (!user) {
				var passwordHashed = bcrypt.hashSync(password, 8);
					// Usuarios
					Usuarios.create({
						username: username,
						password: passwordHashed,
						id_pregunta: id_pregunta,
						respuesta_seguridad : respuesta_seguridad,
						borrado : true
					}).then(user => {
						const token = jwt.sign({id : user.dataValues.id, username : user.dataValues.username }, require('../config').key, {
							expiresIn: '24h'
						});
						// Usuarios Domicilio
						UsuariosDomicilio.create({
							id_usuario : user.dataValues.id,
							telefono_habitacional : telefono_habitacional,
							telefono_personal : telefono_personal,
							id_parroquia : id_parroquia,
							direccion_habitacional : direccion_habitacional,
						}).then( async user2 => {
							var cedulaHijo;
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
								});
								// Usuarios Perfil
								UsuariosRepresentante.count({ where : { cedula : cedula_representante	}}).then(count => {
									cedulaHijo = `${cedula_representante}-${count}`;
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
										var mailOptions = {
											from: userEmail,
											to: user.dataValues.username,
											subject: 'Activación cuenta de usuario para el sistema semillero',
											html: `<h1> Hola, ${usuario.dataValues.primer_nombre} ${usuario.dataValues.primer_apellido}!</h1><p>Para activar su cuenta de usuario, por favor haga click en el siguiente enlace: <a href="http://crs.mppct.gob.ve/activateuser/${token}">Activar usuario</a>`,
										};
										transporter.sendMail(mailOptions, function(error, info){
											if (!error){
												res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Se ha enviado un enlace al correo electronico suministrado para la activación de su cuenta de usuario!'} });
											} else {
												res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'ERROR 00000 Servidor de correos no responde' }})
											}
										});
										//res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario registrado éxitosamente!'} });
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
								});
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
								}).then(usuario2 => {
									var mailOptions2 = {
										from: userEmail,
										to: user.dataValues.username,
										subject: 'Activación cuenta de usuario para el sistema semillero',
										html: `<h1> Hola, ${usuario2.dataValues.primer_nombre} ${usuario2.dataValues.primer_apellido}!</h1><p>Para activar su cuenta de usuario, por favor haga click en el siguiente enlace: <a href="http://crs.mppct.gob.ve/activateuser/${token}">Activar usuario</a>`,
									};
									transporter.sendMail(mailOptions2, function(error, info){
										if (!error){
											res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Se ha enviado un enlace al correo electronico suministrado para la activación de su cuenta de usuario!'} });
										} else {
											res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'ERROR 00000 Servidor de correos no responde' }})
										}
									});
									//res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario registrado éxitosamente!'} });
								}).catch(err => {
									// Validation before send query on database
									if (err.name == 'SequelizeValidationError') {
										res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
									}
									if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
										var { severity, code, detail } = err.parent;
										detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
										res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
									}
								});
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
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API LOGIN
	@params username string, password string
	@return token string
	@tested true
*/
exports.login = (req, res) => {
	console.log('func -> Login');
	if (req.body.params != undefined) {
		const { username, password } = req.body.params;
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
			where : { username : username }
		}).then(user => {
			if (!user) {
				res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Usuario invalido o no existente!'} });
			}

			const { borrado } = user;
			if (borrado) {
				res.status(200).json({ alert: { type: 'warning', title: 'Atención', message: 'Su cuenta ha sido bloqueada por un administrador o no ha sido activada, pongase en contacto con el equipo de soporte para mayor información!' }});
			} else {
					bcrypt.compare(password, user.password).then(response => {
					if (response) {
						delete user.dataValues.password;
						const payload = { user };
						const token = jwt.sign(payload, require('../config').key, {
							expiresIn: '1h'
						});
						res.status(200).json({ token : token, alert : { type : 'success', title : 'Información', message : 'Inicio de sesión exitoso!'} });
					} else {
						res.status(200).json({ alert : { type : 'warning', title: 'Atención', message : 'Usuario o contraseña invalido!'} });
					}
				});
			}
		}).catch(err => {
		// Validation after send query on database
		if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError') {
			const { severity, code, detail } = err.parent;
		}
		// Validation after send query on database
		if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
			var { severity, code, detail } = err.parent;
			detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
			res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
		}
		});
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API CHECK USER
*/
exports.checkuser = (req, res) => {
	console.log('func -> Check user');
	if (req.body.params != undefined) {
		const { cedula } = req.body.params;
		if (cedula != undefined) {
			UsuariosPerfil.count({ where : { cedula : cedula }}).then(result => {
				console.log(result);
				if (result > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario ya se encuentra registrado en el sistema'}});
				} else {
					res.status(200).json({ alert : { type : 'danger', found : false }});
				}
			}).catch(err => {
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError') {
					const { severity, code, detail } = err.parent;
				}
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
					var { severity, code, detail } = err.parent;
					detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
					res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
				}
			});
		} else {
			res.status(200).json({ alert : { type: 'warning', title : 'Atención', message : 'Atributos \'nacionalidad\' y \'cedula\' requeridos!'}})
		}
	} else {
		res.status(200).json({ alert: { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});	
	}
}

/* API ACTIVATE USER
*/
exports.activateuser = (req, res) => {
	console.log('func -> Activate User');
	if (req.body.params != undefined) {
		const { id, username } = req.body.params;
		if (id != undefined && username != undefined) {
			Usuarios.update({ borrado : false, actualizado_por : id }, { where : { id : id, username : username }}).then(result => {
				if (result[0] > 0) {
					res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario activado exitosamente!'}});
				} else {
					res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Error al activar usuario, por favor intentelo de nuevo!'}});
				}
			}).catch(err => {
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError') {
					const { severity, code, detail } = err.parent;
				}
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
					var { severity, code, detail } = err.parent;
					detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
					res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
				}
			});
		} else {
			res.status(200).json({ alert : { type: 'warning', title : 'Atención', message : 'Atributos \'id\' y \'username\' requeridos!'}})
		}
	} else {
		res.status(200).json({ alert: { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});	
	}
};

/*¨API RECOVER PASSWORD
 @params username string
 @return mixed
 @tested false
*/
exports.recoverpassword = (req, res) => {
	console.log('func -> Recover Password');
	if (req.body.params != undefined) {
		const { username } = req.body.params;
		Usuarios.findOne({
			attributes : ['username'],
			where : { username : username },
			include: [
				{ model : PreguntasSeguridad, as : 'pregunta_seguridad', attributes : ['nombre'] }
			]
		}).then(user => {
			if (!user) {
				res.status(200).json({ alert : { type: 'warning', title : 'Atención', message : 'Usuario incorrecto o no existente'}});
			} else {
				res.status(200).json(user);
			}
		})
	} else {
		res.status(200).json({ alert: { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API RECOVER PASSWORD 2 */
exports.recoverpassword2 = (req, res) => {
	console.log('func -> Recover Password 2');
		if (req.body.params != undefined) {
		const { username, respuesta } = req.body.params;
		if (username != undefined && respuesta != undefined) {
			Usuarios.findOne({
				attributes : ['username', 'respuesta_seguridad'],
				where : { username : username },
				include : [ {model : UsuariosPerfil, attributes : ['primer_nombre', 'primer_apellido' ]}]
			}).then(resp => {
				if (resp == null) {
					res.status(200).json({ alert: { type: 'warning', title : 'Atención', message : 'El email que has introducido es incorrecto' }});
				} else {
					if (resp.dataValues.respuesta_seguridad === respuesta) {
						const token = jwt.sign({username : resp.dataValues.username}, require('../config').key, {
							expiresIn: '1h'
						});
						var { primer_nombre, primer_apellido } = resp.dataValues.usuarios_perfil;
						var mailOptions = {
							from: userEmail,
							to: resp.dataValues.username,
							subject: 'Recuperación de acceso Sistema semillero',
							html: `<h1>  Hola, ${primer_nombre} ${primer_apellido}!</h1><p>Para continuar con el proceso de recuperación de contraseña, por favor haga click en el siguiente enlace: <a href="http://crs.mppct.gob.ve/updatepassword/${token}">Restablecer contraseña</a>`,
						};
						transporter.sendMail(mailOptions, function(error, info){
							if (!error){
								res.status(200).json({ alert: { type : 'success', title : 'Información', message : 'Se ha enviado un correo electronico a su correo registrado en el sistema' }});
							} else {
								res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'ERROR 00000 Servidor de correos no responde' }})
							}
						});
					} else {
						res.status(200).json({ alert : { type : 'warning', title: 'Atención', message : 'Su respuesta es incorrecta'}});
					}
				}
			})
		} else {
			res.status(200).json({ alert : { type: 'warning', title : 'Atención', message : 'Parametros \'username\' y \'respuesta\' requeridos'}})
		}
	} else {
		res.status(200).json({ alert: { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API UPDATE PASSWORD
	@params username string, password string
	@return mixed
*/
exports.updatepassword = (req, res) => {
	console.log('func -> Update Password');
	if (req.body.params != undefined) {
		const { username, password } = req.body.params;
		if (username != undefined && password != undefined) {
			var passwordHashed = bcrypt.hashSync(password, 8);
			Usuarios.update({
			  password: passwordHashed,
			}, {
			  where: {
			    username: username
			  }
			}).then(result => {
				if (result.length > 0) {
					res.status(200).json({ alert: { type: 'successs', title: 'Información', message: 'Su contraseña ha sido actualizada exitosamente!'}});
				} else {
					res.status(200).json({ alert: { type: 'warning', title: 'Atención', message : 'Error al actualizar su contraseña!'}});
				}
			});
		} else {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Parametros \'username\' y \'password\' requeridos'}})
		}
	} else {
		res.status(200).json({ alert: { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API ESTADOS
	@params nothing or string
	@return object
*/
exports.estados = (req, res) => {
	console.log('func -> Estados');
	if (req.body.params != undefined) {
		const { id_estado } = req.body.params;
		if (id_estado == undefined) {
				Estados.findAll()
				.then(estados => {
					res.status(200).json(estados);
				});
		} else {
			Estados.findOne({
				where : {
					id_estado : id_estado
				}
			}).then(estado => {
				res.status(200).json(estado);
			})
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API MUNICIPIOS
	@params nothing or string
	@return object
*/
exports.municipios = (req, res) => {
	console.log('func -> Municipios');
	if (req.body.params != undefined) {
		const { id_estado } = req.body.params;
		if (id_estado != undefined) {
			Municipios.findAll({
				where : {
					id_estado : id_estado
				}
			}).then(municipios => {
				res.status(200).json(municipios);
			})
		} else {
			Municipios.findAll()
			.then(municipios => {
				res.status(200).json(municipios);
			});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API PARROQUIAS
	@params nothing or string
	@return object
*/
exports.parroquias = (req, res) => {
	console.log('func -> Parroquias');
	if (req.body.params != undefined) {
		const { id_municipio } = req.body.params;
		if (id_municipio != undefined) {
			Parroquias.findAll({
				where : {
					id_municipio : id_municipio
				}
			}).then(parroquias => {
				res.status(200).json(parroquias);
			})
		} else {
			Parroquias.findAll()
			.then(parroquias => {
				res.status(200).json(parroquias);
			});
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/* API SAIME
 @params string
 @return object
*/
exports.saime = (req, res) => {
	console.log('func -> Saime');
	if (req.body.params != undefined) {
		const { nacionalidad, cedula } = req.body.params;
		if (nacionalidad != undefined && cedula != undefined) {
			Saime.findAll({
				where : {
					origen : nacionalidad,
					cedula : cedula
				}
			}).then(persona => {
				res.status(200).json(persona);
			}).catch(err => {
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError') {
					const { severity, code, detail } = err.parent;
				}
				// Validation after send query on database
				if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
					var { severity, code, detail } = err.parent;
					detail = (detail == undefined || detail == null ) ? errDb.errorsDb(code) : detail;
					res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
				}
			})
		} else {
			res.status(200).json({ alert : { type: 'warning', title : 'Atención', message: 'Parametros \'nacionalidad\' y \'cedula\' requeridos!'}})
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};