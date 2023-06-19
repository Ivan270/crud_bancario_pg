import app from './src/app.js';
import db from './src/db/db.js';

// db.pool.connect();

const main = async () => {
	try {
		let client = await db.pool.connect();
		let result = await client.query('SELECT now()');
		console.log(
			'Servidor conectado a la base de datos. Hora del servidor: ' +
				result.rows[0].now
		);
		const PORT = 3000;
		let servidor = app.listen(PORT);
		servidor.on('error', (error) => {
			console.log('error', error);
		});
		console.log(`Servidor escuchando en http://localhost:${PORT}`);
	} catch (error) {
		console.log('Error al conectar a la base de datos');
	}
};

main();
