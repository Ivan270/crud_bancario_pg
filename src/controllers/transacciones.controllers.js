import Transaccion from '../models/Transaccion.js';
import Cuenta from '../models/Cuenta.js';

export const getTransacciones = async (req, res) => {
	try {
		let transacciones = await Transaccion.findAll();
		res.send({ code: 200, data: transacciones, message: 'OK' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al buscar las transacciones', error });
	}
};
export const getTransaccionesId = async (req, res) => {
	try {
		let { id } = req.params;
		let transaccion = await Transaccion.findById(id);
		res.send({ code: 200, data: transaccion, message: 'OK' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al encontrar la transaccion' });
	}
};

export const createTransaccion = async (req, res) => {
	try {
		let { monto, cuenta_origen, cuenta_destino } = req.body;
		console.log(monto, cuenta_origen, cuenta_destino);
		let resultado = await Transaccion.create({
			monto,
			cuenta_origen,
			cuenta_destino,
		});
		res.status(201).send({ code: 201, message: resultado });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al crear nueva transaccion' + error });
	}
};
