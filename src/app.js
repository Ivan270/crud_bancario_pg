import express from 'express';
import cors from 'cors';
import usuarios from './routes/usuarios.routes.js';
import cuentas from './routes/cuentas.routes.js';
import transacciones from './routes/transacciones.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/banco/usuarios', usuarios);
app.use('/banco/cuentas', cuentas);
app.use('/banco/transacciones', transacciones);
export default app;
