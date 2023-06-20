import db from '../db/db.js';

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
	// create() {
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			await db.consulta('BEGIN');
	// 			let querySaldo = {
	// 				text: 'SELECT saldo FROM cuentas WHERE id =$1',
	// 				values: [this.cuenta_origen],
	// 			};
	// 			let saldo = await db.consulta(querySaldo);
	// 			if (saldo < this.monto) {
	// 				await db.consulta('ROLLBACK');
	// 				return reject('No tienes saldo suficiente');
	// 			}
	// 			if (this.monto <= 0) {
	// 				await db.consulta('ROLLBACK');
	// 				return reject('No se puede enviar un monto igual o menor a 0');
	// 			}
	// 			if (this.cuenta_origen == '' || this.cuenta_destino == '') {
	// 				await db.consulta('ROLLBACK');
	// 				return reject('Debe especificar cuentas de destino y origen');
	// 			}
	// 			let query = {
	// 				text: 'INSERT INTO registro_transacciones VALUES(default, default, $1, $2, $3) RETURNING id, fecha, monto, cuenta_origen, cuenta_destino',
	// 				values: [this.monto, this.cuenta_origen, this.cuenta_destino],
	// 			};
	// 			let result = await db.consulta(query);
	// 			await db.consulta('COMMIT');
	// 			return resolve(result);
	// 		} catch (error) {
	// 			await db.consulta('ROLLBACK');
	// 			reject(error);
	// 		}
	// 	});
	// }
}
