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

const sumarSaldo = async (transaccion) => {
	let ctaDestino = await Cuenta.findById(transaccion.cuenta_destino);
	console.log('Sumar a');
	console.log(ctaDestino);
	// let sumar = await Cuenta.update(
	// 	ctaDestino[0].numero,
	// 	ctaDestino[0].id_cliente,
	// 	ctaDestino[0].saldo + transaccion.monto,
	// 	true
	// );
};
const restarSaldo = async (transaccion) => {
	let ctaOrigen = await Cuenta.findById(transaccion.cuenta_origen);
	console.log('Restar a');
	console.log(ctaOrigen);
	// let restar = await Cuenta.update(
	// 	ctaOrigen[0].numero,
	// 	ctaOrigen[0].id_cliente,
	// 	ctaOrigen[0].saldo - transaccion.monto,
	// 	true
	// );
};

export const createTransaccion = async (req, res) => {
	try {
		let { monto, cuenta_origen, cuenta_destino } = req.body;
		let transaccion = new Transaccion(
			undefined,
			undefined,
			monto,
			cuenta_origen,
			cuenta_destino
		);
		console.log(transaccion);
		// RESTAR A CTA ORIGEN
		// restarSaldo(transaccion);

		// SUMAR A CTA DESTINO
		// sumarSaldo(transaccion);

		// let result = await transaccion.create();
		res.send({ code: 201, data: 'asd', message: 'OK' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al crear nueva transaccion', error });
	}
};
