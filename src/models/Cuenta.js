import db from '../db/db.js';

export default class Cuenta {
	constructor(numero, idCliente, saldo, estado) {
		this.numero = numero;
		this.idCliente = idCliente;
		this.saldo = saldo;
		this.estado = estado;
	}
	static findAll() {
		return new Promise(async (resolve, reject) => {
			try {
				let result = await db.consulta(
					'SELECT u.id, u.nombre, u.apellido, c.numero, c.saldo FROM usuarios u INNER JOIN cuentas c on u.id = c.id_cliente WHERE u.estado = true'
				);
				resolve(result);
			} catch (error) {
				reject('Error al traer usuarios de la base de datos');
			}
		});
	}
	static findById(numCuenta) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'SELECT numero, id_cliente, saldo, estado FROM cuentas WHERE numero = $1',
					values: [numCuenta],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	create() {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(this.idCliente);
				const query = {
					text: 'INSERT INTO cuentas VALUES ($1, $2, $3, $4) RETURNING numero, id_cliente, saldo, estado',
					values: [this.numero, this.idCliente, this.saldo, this.estado],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	static update(numero, idCliente, saldo, estado) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'UPDATE cuentas SET id_cliente=$2, saldo=$3, estado=$4 WHERE numero=$1 RETURNING numero, id_cliente, saldo, estado',
					values: [numero, idCliente, saldo, estado],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	static delete(numero) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'UPDATE cuentas SET estado=$2 WHERE numero=$1 RETURNING numero, id_cliente, saldo, estado',
					values: [numero, false],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	static sumarSaldo(monto, numCuenta, idCliente) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'UPDATE cuentas SET saldo + $1 WHERE numero = $2 AND id_cliente = $3 RETURNING numero, id_cliente, saldo',
					values: [monto, numCuenta, idCliente],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject('Error al agregar saldo a la cuenta', error);
			}
		});
	}
	static restarSaldo(monto, numCuenta, idCliente) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'UPDATE cuentas SET saldo - $1 WHERE numero = $2 AND id_cliente = $3 RETURNING numero, id_cliente, saldo',
					values: [monto, numCuenta, idCliente],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject('Error al quitar saldo a la cuenta', error);
			}
		});
	}
}
