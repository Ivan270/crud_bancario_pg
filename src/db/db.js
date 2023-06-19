import pkg from 'pg';

const { Pool } = pkg;

const config = {
	host: 'localhost',
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: 5432,
	max: 5,
};

const consulta = (query) => {
	return new Promise(async (resolve, reject) => {
		let client;
		try {
			client = await pool.connect();
			const result = await client.query(query);
			console.log(result.rows);
			resolve(result.rows);
		} catch (error) {
			reject(error);
		} finally {
			try {
				if (client) {
					client.release();
					console.log('Cliente liberado');
				}
			} catch (error) {
				console.log(error);
			}
		}
	});
};

const pool = new Pool(config);
export default { pool, consulta };
