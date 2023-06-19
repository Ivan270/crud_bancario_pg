import express from 'express';
import {
	getUsuarios,
	getUsuariosId,
	deleteUsuario,
	crearUsuario,
	updateUsuario,
} from '../controllers/usuarios.controllers.js';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/id/:id', getUsuariosId);
router.delete('/id/:id', deleteUsuario);
router.post('/', crearUsuario);
router.put('/id/:id', updateUsuario);

export default router;
