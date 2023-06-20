import Cuenta from '../models/Cuenta.js';

export const getCuentas = async (req, res) => {
	try {
		let usuarios = await Cuenta.findAll();
		// res.send({ code: 200, data: usuarios, message: 'OK' });
		res.status(200).render('cuentas', {
			usuarios,
		});
	} catch (error) {
		res.status(500).send({
			code: 500,
			message: 'Error al consultar la tabla cuentas',
			error,
		});
	}
};
export const getCuentasId = async (req, res) => {
	try {
		let { numero } = req.params;
		let result = await Cuenta.findById(numero);
		res.send({ code: 200, data: result, message: 'OK' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo encontrar la cuenta', error });
	}
};
export const deleteCuenta = async (req, res) => {
	try {
		let { numero } = req.params;
		let result = await Cuenta.delete(numero);
		res.send({ code: 200, data: result, message: 'OK' });
	} catch (error) {
		res.status(500).send({
			code: 500,
			message: 'Error al intentar eliminar la cuenta',
			error,
		});
	}
};
export const crearCuenta = async (req, res) => {
	try {
		let { numero, id_cliente, saldo, estado } = req.body;
		let nuevaCuenta = new Cuenta(numero, id_cliente, saldo, estado);
		let result = await nuevaCuenta.create();
		res.send({ code: 200, data: result, message: 'OK' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo crear la nueva cuenta', error });
	}
};
export const updateCuenta = async (req, res) => {
	try {
		let { numero } = req.params;
		let { id_cliente, saldo, estado } = req.body;
		let result = await Cuenta.update(numero, id_cliente, saldo, estado);
		res.send({ code: 200, data: result, message: 'OK' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al actualizar la cuenta', error });
	}
};
