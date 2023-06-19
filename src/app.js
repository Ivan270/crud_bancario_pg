import express from 'express';
import cors from 'cors';
import usuarios from './routes/usuarios.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/banco/usuarios', usuarios);

export default app;
