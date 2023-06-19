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
					'SELECT numero, id_cliente, saldo, estado FROM cuentas'
				);
				resolve(result.rows);
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
				let objCuenta = {
					numero: this.numero,
					idCliente: this.idCliente,
					saldo: this.saldo,
					estado: this.estado,
				};
				const query = {
					text: 'INSERT INTO cuentas VALUES($1, $2, $3, $4) RETURNING numero, id_cliente, saldo, estado',
					values: [
						objCuenta.numero,
						objCuenta.idCliente,
						objCuenta.saldo,
						objCuenta.estado,
					],
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
					text: 'DELETE FROM cuentas WHERE numero = $1',
					values: [numero],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

// Cuenta.findAll();
// Cuenta.findById('111111111');
// let newCuenta = new Cuenta('333333333', 2, 0, false);
// newCuenta.create();
// Cuenta.update('333333333', 1, 120000, true);
// Cuenta.delete('333333333');
