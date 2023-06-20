import db from '../db/db.js';
import Cuenta from './Cuenta.js';
import Usuario from './Usuario.js';

export default class Transaccion {
	constructor(id, fecha, monto, cuenta_origen, cuenta_destino) {
		this.id = id;
		this.fecha = fecha;
		this.monto = monto;
		this.cuenta_origen = cuenta_origen;
		this.cuenta_destino = cuenta_destino;
	}
	static findAll() {
		return new Promise(async (resolve, reject) => {
			try {
				await db.consulta('BEGIN');
				let result = await db.consulta(
					'SELECT id, fecha, monto, cuenta_origen, cuenta_destino FROM registro_transacciones'
				);
				// Valida que existan transacciones para mostrar
				if (result.length == 0) {
					await db.consulta('ROLLBACK');
					return reject('No se han encontrado transacciones para mostrar');
				} else {
					await db.consulta('COMMIT');
					return resolve(result);
				}
			} catch (error) {
				await db.consulta('ROLLBACK');
				reject(error);
			}
		});
	}
	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				await db.consulta('BEGIN');
				let query = {
					text: 'SELECT id, fecha, monto, cuenta_origen, cuenta_destino FROM registro_transacciones WHERE id = $1',
					values: [id],
				};
				let result = await db.consulta(query);
				await db.consulta('COMMIT');
				return resolve(result);
			} catch (error) {
				await db.consulta('ROLLBACK');
				reject(error);
			}
		});
	}
	static create({ monto, cuenta_origen, cuenta_destino }) {
		return new Promise(async (resolve, reject) => {
			try {
				await db.consulta('BEGIN');
				let queryOrigen = {
					text: 'SELECT * FROM cuentas WHERE numero = $1',
					values: [cuenta_origen],
				};
				// Valida cuenta origen
				let cuentaOrigen = await db.consulta(queryOrigen);
				cuentaOrigen = cuentaOrigen[0];
				if (!cuentaOrigen) throw new Error('Cuenta origen no encontrada');

				// Valida cuenta destino
				// await db.consulta('COMMIT');
				let queryDestino = {
					text: 'SELECT * FROM cuentas WHERE numero = $1',
					values: [cuenta_destino],
				};

				let cuentaDestino = await db.consulta(queryDestino);
				cuentaDestino = cuentaDestino[0];

				if (!cuentaDestino) throw new Error('Cuenta destino no encontrada');

				// Registro de transacción
				let queryTransaccion = {
					text: 'INSERT INTO registro_transacciones VALUES(default, default, $1, $2, $3) RETURNING id',
					values: [monto, cuentaOrigen.numero, cuentaDestino.numero],
				};
				let detalleTransaccion = await db.consulta(queryTransaccion);
				// console.log('DETALLE TRANSACCION EL ID');
				// console.log(detalleTransaccion[0]);

				let idTransaccion = detalleTransaccion[0].id;

				// Descontar a cta origen
				let resultRestar = await Cuenta.restarSaldo(monto, cuenta_origen);
				console.log('NUEVO BALANCE CUENTA ORIGEN');
				console.table(resultRestar);

				// Sumar a cta destino
				let resultSumar = await Cuenta.sumarSaldo(monto, cuenta_destino);
				console.log('NUEVO BALANCE CUENTA DESTINO');
				console.table(resultSumar);

				await db.consulta('COMMIT');
				return resolve(`Transacción ID:${idTransaccion} realizada con exito`);
				// return resolve(detalleTransaccion[0]);
			} catch (error) {
				await db.consulta('ROLLBACK');
				console.log(error.message);
				reject(error.message);
			}
		});
	}
}
