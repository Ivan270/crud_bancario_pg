import express from 'express';
import cors from 'cors';
import usuarios from './routes/usuarios.routes.js';
import cuentas from './routes/cuentas.routes.js';
import transacciones from './routes/transacciones.routes.js';
import routesViews from './routes/views.routes.js';
import { create } from 'express-handlebars';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

let ruta = path.resolve(__dirname, './views');

const app = express();
const hbs = create({
	partialsDir: [path.join(ruta, '/partials')],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/'));
app.use(cors());

// Rutas
app.use('/', routesViews);
app.use('/banco/usuarios', usuarios);
app.use('/banco/cuentas', cuentas);
app.use('/banco/transacciones', transacciones);

export default app;
