let jwt  = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

/* Databases */
const db = require('../config/databases.js');

/* Model */
const Usuarios = db.Usuarios;
const ProyectosXCategorias = db.ProyectosXCategorias;

/* Faker */
let faker = require('faker');
faker.locale = "es";

exports.usuario = (req, res) => {
	var password = '123456';
	password = bcrypt.hashSync(password, 8);

	console.log('func -> Test registro usuario');
	Usuarios.create({
		username : faker.internet.userName(),
	  password : password,
	  id_pregunta : 1,
	  respuesta_seguridad : 'MUÑECA'
	}).then(user => {
			res.send('Usuario registrado exitosamente!');
	}).catch(err => {
		res.status(500).send('Error ->' + err);
	});
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

exports.insertProyectosMasivo = (req, res) => {
	const data = [1,2]

	ProyectosXCategorias.bulkCreate({id_categoria : data})
	.then(proyeto => {
		console.log(proyecto);
	}).catch(err => {
		res.status(200).json(err);
	})
}