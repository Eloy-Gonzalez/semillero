let db = require('../config/databases.js');
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
const Proyectos = db.Proyectos;
const ProyectosXCategorias = db.ProyectosXCategorias;
const Usuarios = db.Usuarios;
const UsuariosPerfil = db.UsuariosPerfil;
const UsuariosDomicilio = db.UsuariosDomicilio;
const UsuariosRepresentante = db.UsuariosRepresentante;
const Estados = db.Estados;
const Municipios = db.Municipios;
const Parroquias = db.Parroquias;

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
			id_periodo,
			nombre,
			descripcion,
			url_video,
			categorias
 		} = req.body.params;
		
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
								console.log('Entrando en el if')
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
										if (code == '22003') {detail = 'Valor numerico fuera del rango permitido';}
										if (code == '22P02') {detail = 'Sintaxis de entrada no vÃ¡lida para integer';}
										if (code == '42703') {detail = 'Columna indefinida';}
										res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
									}
								})
							}
							
							// Usuarios Perfil
							UsuariosRepresentante.count({ where : {
								cedula : cedula_representante
							}}).then(count => {
								var cedulaHijo = (cedula == undefined || cedula == '' || cedula == null) 
								? `${cedula_representante}-${count + 1}` 
								: cedula;

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
										if (code == '22003') {detail = 'Valor numerico fuera del rango permitido';}
										if (code == '22P02') {detail = 'Sintaxis de entrada no vÃ¡lida para integer';}
										if (code == '42703') {detail = 'Columna indefinida';}
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
									if (code == '22003') {detail = 'Valor numerico fuera del rango permitido';}
									if (code == '22P02') {detail = 'Sintaxis de entrada no vÃ¡lida para integer';}
									if (code == '42703') {detail = 'Columna indefinida';}
									res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
								}
							})
						})
					}).catch(err => {
						// Validation before send query on database
						if (err.name == 'SequelizeValidationError') {
							res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
						}
						if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError' || err.name == 'SequelizeDatabaseError') {
							var { severity, code, detail } = err.parent;
							if (code == '22003') {detail = 'Valor numerico fuera del rango permitido';}
							if (code == '22P02') {detail = 'Sintaxis de entrada no vÃ¡lida para integer';}
							if (code == '42703') {detail = 'Columna indefinida';}
							res.status(200).json({ alert : { type: 'danger', title : 'AtenciÃ³n', message : `${severity}: ${code} ${detail}`}});	
						}
					})
					// Proyecto
					// let proyecto = await Proyectos.create({
					// 	id_usuario : userDirection.dataValues.id_usuario,
					// 	id_periodo : id_periodo,
					// 	nombre : nombre,
					// 	descripcion : descripcion,
					// 	url_video : url_video
					// }, { transaction : t });
					// console.log('Step 4 -> Success');
					// // Proyectos_x_categorias
					// var data = [];
					// categorias.forEach((index, value) => {
					// 	data.push({
					// 		id_proyecto : proyecto.dataValues.id,
					// 		id_categoria : index
					// 	})
					// });
					// let proyecto2 = await ProyectosXCategorias.bulkCreate(data, { transaction : t });
					//console.log('Step 5 -> Success');	
			} else {
				res.status(200).json({ alert : { type : 'warning', title : 'Atención', message : 'Usted ya posee un usuario en el sistema!'} });
			}
		})
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
				const { username, borrado, version } = result[0];
				if (borrado) {
					res.status(200).json({ alert: { type: 'warning', title: 'Atención', message: 'Su cuenta ha sido bloqueada por un administrador, pongase en contacto con el equipo de soporte para mayor información!' }});
				} else{
					bcrypt.compare(password, result[0].password).then(response => {
						// Si coinciden las contraseñas
						if (response) {
							const payload = {username : username,version : version};

							// Se crea el token junto con los datos del usuario
							const token = jwt.sign(payload, require('../config').key, {
								expiresIn: '1h'
							});
							res.status(200).json({ token : token, alert : { type : 'success', title : 'Información', message : 'Inicio de sesión exitoso!'} });
						} else {
							res.status(200).json({ alert : { type : 'warning', title: 'Atención', message : 'Usuario o contraseña invalido!'} });
						}
					});
				}
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
exports.recoverpassword = (req, res) => {
	console.log('func -> Recover Password');
	if (req.body.params != undefined) {
		const { username } = req.body.params;
		db.bus.query("\
			SELECT\
				u.username, p.primer_nombre, p.primer_apellido\
			FROM seguridad.usuarios as u\
			LEFT JOIN seguridad.usuarios_perfil as p on p.id_usuario = u.id\
			WHERE\
				u.username = :username\
			", { replacements: { username: username }, type: db.bus.QueryTypes.SELECT }
		).then(result => {
			if(result.length > 0){
				const token = jwt.sign({username : username}, require('../config').key, {
					expiresIn: '1h'
				});

				var { primer_nombre, primer_apellido } = result[0];
				var mailOptions = {
					from: userEmail,
					to: result[0].username,
					subject: 'Recuperación de acceso Sistema semillero',
					html: `<h1>  Hola, ${primer_nombre} ${primer_apellido}!</h1><p>Para continuar con el proceso de recuperación de contraseña, por favor haga click aquí`,
				};
				transporter.sendMail(mailOptions, function(error, info){
					if (!error){
						res.status(200).json({ alert: { type : 'success', title : 'Información', message : 'Se ha enviado un mensaje al correo registrado' }});
					} else {
						res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'ERROR 00000 Servidor no responde' }})
					}
				});
			}
		});
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
					if (code == '22003') {detail = 'Valor numerico fuera del rango permitido';}
					if (code == '22P02') {detail = 'Sintaxis de entrada no válida para integer';}
					if (code == '42703') {detail = 'Columna indefinida';}
					res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
				}
			})
		} else {
			res.status(200).json({ alert : { type: 'warning', title : 'Atención', message: 'Parametros \'nacionalidad\' y \'cedula\' requeridos!'}})
		}
	} else {
		res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : 'Objeto \'params\' vacio!'}});
	}
}