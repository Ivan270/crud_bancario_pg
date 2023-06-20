import db from '../db/db.js';

export default class Usuario {
	constructor(id = undefined, nombre, apellido, email, password, estado) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.password = password;
		this.estado = estado;
	}
	static findAll() {
		return new Promise(async (resolve, reject) => {
			try {
				let result = await db.consulta(
					'SELECT id, nombre, apellido, email, password, estado FROM usuarios WHERE estado = true ORDER BY id ASC'
				);
				resolve(result);
			} catch (error) {
				reject('Error al traer usuarios de la base de datos');
			}
		});
	}
	create() {
		return new Promise(async (resolve, reject) => {
			try {
				let objUsuario = {
					nombre: this.nombre,
					apellido: this.apellido,
					email: this.email,
					password: this.password,
					estado: this.estado,
				};
				const query = {
					text: 'INSERT INTO usuarios(nombre, apellido, email, password, estado) VALUES ($1,$2,$3,$4, $5) RETURNING nombre, apellido, email, password, estado',
					values: [
						objUsuario.nombre,
						objUsuario.apellido,
						objUsuario.email,
						objUsuario.password,
						objUsuario.estado,
					],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	static delete(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const query = {
					text: 'UPDATE usuarios SET estado=$2 WHERE id=$1 RETURNING nombre, apellido, email, password, estado',
					values: [id, false],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	static update(id, nombre, apellido, email, password) {
		return new Promise(async (resolve, reject) => {
			try {
				const query = {
					text: 'UPDATE usuarios SET nombre=$2, apellido=$3, email=$4, password=$5 WHERE id = $1 RETURNING nombre, apellido, email, password, estado',
					values: [id, nombre, apellido, email, password],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const query = {
					text: 'SELECT id, nombre, apellido, email, password, estado FROM usuarios WHERE id = $1',
					values: [id],
				};
				let result = await db.consulta(query);
				return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

// Usuario.findAll();

// let user = new Usuario(1, 'Desde', 'Node', 'desdenode@gmail.com', '12345678');

// user.create();

// Usuario.delete(3);
// Usuario.update(1, 'Juanin', 'Perecin', 'juanin@gmail.com', '12345678');
// Usuario.findById(2);
