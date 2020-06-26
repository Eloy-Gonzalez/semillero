let jwt  = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

/* Databases */
const db = require('../config/databases.js');

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
const Periodos = db.Periodos;
const Fases = db.Fases;
const Estatus = db.Estatus;

/* Faker */
let faker = require('faker');
faker.locale = "es";

exports.usuario = async (req, res) => {
	var password = '123456';
	var cedula = faker.random.arrayElement(['', faker.random.number(99999999)]);
	var categorias = [1];

	password = bcrypt.hashSync(password, 8);
	// BEGIN TRANSACTION ISOLATION LEVEL 1
	const t = await UsuariosDomicilio.sequelize.transaction({ autocommit : false });
	try {
		// Usuarios
		let user = await Usuarios.create({
			username: faker.internet.userName(),
			password: password,
			id_pregunta: faker.random.number({min : 1, max: 1}),
			respuesta_seguridad : faker.lorem.word(1)
		}, { transaction : t });
		console.log('Step 1 -> Success');
		// ATENCION!!
		if (cedula == '' || cedula != '') {
			// Usuarios Representante
			let representante = await UsuariosRepresentante.create({
				id_usuario : user.dataValues.id,
				cedula : faker.random.number(99999999),
				primer_nombre : faker.name.firstName(),
				segundo_nombre : faker.name.firstName(),
			  primer_apellido : faker.name.lastName(),
			  segundo_apellido : faker.name.lastName(),
				genero : faker.random.arrayElement(['M', 'F']),
			  fecha_nacimiento : '1999-01-01'
			}, { transaction : t });
		}
		// Usuarios Perfil
		let userProfile = await UsuariosPerfil.create({
			id_usuario : user.dataValues.id,
			cedula : faker.random.number(99999999),
			primer_nombre : faker.name.firstName(),
			segundo_nombre : faker.name.firstName(),
		  primer_apellido : faker.name.lastName(),
		  segundo_apellido : faker.name.lastName(),
			genero : faker.random.arrayElement(['M', 'F']),
		  fecha_nacimiento : '2000-01-01',
		}, { transaction : t });
		console.log('Step 2 -> Success');
		// Usuarios Domicilio
		let userDirection = await	UsuariosDomicilio.create({
			id_usuario : userProfile.dataValues.id_usuario,
			telefono_habitacional : faker.random.number(99999999999),
			telefono_personal : faker.random.number(99999999999),
			id_parroquia : faker.random.number(1137),
			direccion_habitacional : faker.address.streetAddress(),
		}, { transaction : t });
		console.log('Step 3 -> Success');
		// Proyecto
		// let proyecto = await Proyectos.create({
		// 	id_usuario : userDirection.dataValues.id_usuario,
		// 	id_periodo : faker.random.number({min: 2, max: 2}),
		// 	nombre : faker.lorem.word(1),
		// 	descripcion : faker.lorem.words(4),
		// 	url_video : faker.internet.url()
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
		// PUSH
		await t.commit();
		// console.log('Step 5 -> Success');
		res.status(200).json({ alert : { type : 'success', title : 'Información', message : 'Usuario registrado éxitosamente!'} });
	} catch(err) {
		// ROLLBACK TRANSACTION ISOLATION LEVEL 1
		await t.rollback();
		
		// Validation before send query on database
		if (err.name == 'SequelizeValidationError') {
			res.status(200).json({ alert : { type : 'danger', title : 'Atención', message : err.errors[0].message }});
		}
		// Validation after send query on database
		if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeForeignKeyConstraintError') {
			const { severity, code, detail } = err.parent;
			res.status(200).json({ alert : { type: 'danger', title : 'Atención', message : `${severity}: ${code} ${detail}`}});	
		}
	}
}

exports.getToken = (req, res) => {
	console.log(req.headers['x-mppct-token']);
}

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
	Usuarios.findAll({
		include: [
			{ model : UsuariosPerfil },
			{ model : UsuariosRepresentante },
			{ 
				model: UsuariosDomicilio, include: [{ 
					model: Parroquias, required: true, attributes: ['id_parroquia', 'nombre'], include: [{
						model: Municipios, required: true,  attributes: ['id_municipio', 'nombre'], include: [{
							model: Estados, required: true, attributes: ['id_estado', 'nombre'] 
						}]
					}]
				}] 
			},
			{ model: Proyectos, include: [ { model : Estatus, required: true } ] }
		],
		where: { id : 1}
		})
	.then(usuarios => {
	  	res.status(200).json(usuarios)
	})
}