import Usuario from '../models/Usuario.js';

export const getUsuarios = async (req, res) => {
	try {
		let usuarios = await Usuario.findAll();
		res.status(200).render('usuarios', {
			data: usuarios,
		});
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al consultar tabla usuarios' });
	}
};
export const getUsuariosId = async (req, res) => {
	try {
		let { id } = req.params;
		let encontrado = await Usuario.findById(id);
		let user = encontrado[0];
		// res.send({ code: 200, data: encontrado, message: 'OK' });
		res.status(200).render('usuario', {
			user,
		});
	} catch (error) {
		res.status(500).send({ code: 500, message: error });
	}
};
export const deleteUsuario = async (req, res) => {
	try {
		let { id } = req.params;
		let encontrado = await Usuario.delete(id);
		res.send({ code: 200, data: encontrado, message: 'OK' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo eliminar al usuario', error });
	}
};
export const crearUsuario = async (req, res) => {
	try {
		let { nombre, apellido, email, password, estado } = req.body;
		let nuevoUsuario = new Usuario(
			undefined,
			nombre,
			apellido,
			email,
			password,
			estado
		);
		let resultado = await nuevoUsuario.create();
		res.send({
			code: 201,
			data: resultado,
			message: 'Usuario creado con éxito',
		});
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo crear al usuario', error });
	}
};
export const updateUsuario = async (req, res) => {
	try {
		let { id } = req.params;
		let { nombre, apellido, email, password } = req.body;
		let resultado = await Usuario.update(id, nombre, apellido, email, password);
		res.send({
			code: 200,
			data: resultado,
			message: 'Usuario actualizado con éxito',
		});
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo actualizar el usuario', error });
	}
};
