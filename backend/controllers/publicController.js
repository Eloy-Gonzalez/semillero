let db = require('../config/databases.js');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let nodemailer = require('nodemailer');

// Transporter without auth
// var transporter = nodemailer.createTransport({
//   host: 'smtp.mycompany.com',
//   port: 25,
//   secure: false, // true for 465
// });

// Transporter well know service
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'example@gmail.com',
		pass: 'password'
	}
});

/* Model */
const Categorias = db.Categorias;
const Estatus = db.Estatus;
const PreguntasSeguridad = db.PreguntasSeguridad;
const Proyectos = db.Proyectos;
const ProyectosXCategorias = db.ProyectosXCategorias;
const Usuarios = db.Usuarios;
const UsuariosPerfil = db.UsuariosPerfil;
const UsuariosDomicilio = db.UsuariosDomicilio;
const Estados = db.Estados;
const Municipios = db.Municipios;
const Parroquias = db.Parroquias;

/* API REGISTER
	@params username string, email string, password string, nacionalidad string, cedula string
	@return mixed
	@tested true
*/
exports.register = (req, res) => {
	console.log('func -> Register');
	if (req.body.params != undefined) {
		// Añadir el resto de parametros emitidos por el cliente!!
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
			telefono_habitacional,
			telefono_personal,
			id_parroquia,
			direccion_habitacional,
			nombre,
			descripcion,
			url_video
 		} = req.body.params;
		
		db.semillero.query("\
			SELECT\
				count(*)\
				FROM seguridad.usuarios\
				WHERE\
					username = :username\
			", { replacements : { username : username }, type: db.semillero.QueryTypes.SELECT }
		).then(result => {
			if (result[0].count == 0) {
				var passwordHashed = bcrypt.hashSync(password, 8);
				// Inicio de proceso transaccional
				Usuarios.create({
				  username : username,
				  password : passwordHashed,
				  id_pregunta : id_pregunta,
				  respuesta_seguridad : respuesta_seguridad
				}).then(user => {
					console.log('Step 1 -> success');
					// Usuarios Perfil
					UsuariosPerfil.create({
						id_usuario : user.dataValues.id,
						cedula : cedula,
  					primer_nombre : primer_nombre,
  					segundo_nombre : segundo_nombre,
					  primer_apellido : primer_apellido,
					  segundo_apellido : segundo_apellido,
  					genero : genero,
					  fecha_nacimiento : fecha_nacimiento,
					}).then(user2 => {
						console.log('Step 2 -> success');
						// Usuarios Domicilio
						UsuariosDomicilio.create({
							id_usuario : user2.dataValues.id_usuario,
  						telefono_habitacional : telefono_habitacional,
  						telefono_personal : telefono_personal,
  						id_parroquia : id_parroquia,
  						direccion_habitacional : direccion_habitacional,
						}).then(user3 => {
							console.log('Step 3 -> success');
							// Proyecto
							Proyectos.create({
								id_usuario : user3.dataValues.id_usuario,
								nombre : nombre,
								descripcion : descripcion,
								url_video : url_video
							}).then(proyecto => {
								console.log('Step 4 -> success');
								// Proyectos_x_categorias
								// Obtener el id del proyecto
								// id_categoria es un array, ¿Como se inserta un array usando sequelize?
								// ProyectosXCategorias({
								// 	id_proyecto : 
								// 	id_categoria 
								// }).then(success => {
								// 	console.log(success); // Evaluar si el registro fue exitoso ( Continuar Aquí )
								// }).catch(err => {
								// 	res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err }});
								// })
								res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario registrado éxitosamente!'} });
							}).catch(err => {
								res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err }});
							})
						}).catch(err => {
							res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err }});
						});
					}).catch(err => {
						res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err }});
					});
				}).catch(err => {
					res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err }});
				});
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
		db.semillero.query("\
			SELECT\
				*\
			FROM seguridad.usuarios\
			WHERE\
				username = :username\
			", { replacements: { username: username }, type: db.semillero.QueryTypes.SELECT }
		).then(result => {
			if (result.length > 0) {
				const {
					username,
					version,
				} = result[0];
				bcrypt.compare(password, result[0].password).then(response => {
					// Si coinciden las contraseñas
					if (response) {
						const payload = {
							username : username,
							version : version
						}

						// Se crea el token junto con los datos del usuario
						const token = jwt.sign(payload, require('../config').key, {
							expiresIn: '1h'
						});
						res.status(200).json({ token : token, alert : { type : 'success', title : 'Información', message : 'Inicio de sesión exitoso!'} });
					} else {
						res.status(200).json({ alert : { type : 'warning', title: 'Atención', message : 'Usuario o contraseña invalido!'} });
					}
				});
			} else {
				res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Usuario invalido o no existente!'} });
			}
		});
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
};

/*¨API RECOVER PASSWORD
 @params username string
 @return mixed
 @tested false
*/
// exports.recoverpassword = (req, res) => {
// 	console.log('func -> Recover Password');
// 	if (req.body.params != undefined) {
// 		const { username } = req.body.params;
// 		db.bus.query("\
// 			SELECT\
// 				username, email\
// 			FROM seguridad.usuarios\
// 			WHERE\
// 				username = :username\
// 				OR email = :username\
// 			", { replacements: { username: username }, type: db.bus.QueryTypes.SELECT }
// 		).then(result => {
// 			if(result.length > 0){
// 					const token = jwt.sign({username : username}, require('../config').key, {
// 						expiresIn: '1h'
// 					});
// 					res.status(200).json({ alert: { type : 'success', title : 'Información', message : 'Se ha enviado un mensaje a su correo electronico '}, token : token });
// 					// var mailOptions = {
// 					// 	from: 'Remitente',
// 					// 	to: result[0].email,
// 					// 	subject: 'Recuperación de acceso SAMINCYT',
// 					// 	html: `<h1>¡Hola, ${username}!</h1><p>Para continuar con el proceso de recuperación de contraseña, por favor haga click en el siguiente enlace: <a href="">Restablecer contraseña</a></p>`
// 					// };
// 					// transporter.sendMail(mailOptions, function(error, info){
// 					// 	if (!error){
// 					// 		res.status(200).json({ alert: { type : 'success', title : 'Información', message : 'Se ha enviado un mensaje a su correo electronico '}, token : token });
// 					// 	} else {
// 					// 		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'ERROR 00000 Servidor no responde!'}})
// 					// 	}
// 					// });
// 			// } else {
// 			// 	res.status(200).json({ alert: { type: 'warning', title : 'Atención', message : 'Usuario invalido o no existe!'}});
// 			}
// 		});
// 	} else {
// 		res.status(200).json({ alert: { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
// 	}
// };

/* API UPDATE PASSWORD
	@params username string, password string
	@return mixed
*/
// exports.updatepassword = (req, res) => {
// 	console.log('func -> Update Password');
// 	if (req.body.params != undefined) {
// 		const { username, password } = req.body.params;
// 		var passwordHashed = bcrypt.hashSync(password, 8);
// 		Usuarios.update({
// 		  password: passwordHashed,
// 		}, {
// 		  where: {
// 		    username: username
// 		  }
// 		}).then(result => {
// 			if (result.length > 0) {
// 				res.status(200).json({ alert: { type: 'successs', title: 'Información', message: 'Su contraseña ha sido actualizada exitosamente!'}});
// 			} else {
// 				res.status(200).json({ alert: { type: 'warning', title: 'Atención', message : 'Error al actualizar su contraseña!'}});
// 			}
// 		});
// 	} else {
// 		res.status(200).json({ alert: { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
// 	}
// };

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

/* API CATEGORIAS
	@params nothing
	@return object
*/
exports.categorias = (req, res) => {
	console.log('func -> Categorias');
	Categorias.findAll().then(categorias => {
		res.status(200).json(categorias);
	});
};

/* API ESTATUS
 @params nothing
 @return object
*/
exports.estatus = (req, res) => {
	console.log('func -> Estatus');
	Estatus.findAll().then(estatus => {
		res.status(200).json(estatus);
	})
};

/* API PREGUNTAS SEGURIDAD
 @params nothing
 @return object
*/
exports.preguntas = (req, res) => {
	console.log('func -> Preguntas de Seguridad');
	PreguntasSeguridad.findAll().then(preguntas => {
		res.status(200).json(preguntas);
	})
}

/* API PROYECTOS
 @params nothing
 @return object
*/
exports.proyectos = (req, res) => {
	console.log('func -> Proyectos');
	Proyectos.findAll().then(proyectos => {
		res.status(200).json(proyectos);
	})
}