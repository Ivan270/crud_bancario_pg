import express from 'express';
import {
	getCuentas,
	getCuentasId,
	deleteCuenta,
	crearCuenta,
	updateCuenta,
} from '../controllers/cuentas.controllers.js';

const router = express.Router();

router.get('/', getCuentas);
router.get('/numero/:numero', getCuentasId);
router.delete('/numero/:numero', deleteCuenta);
router.post('/', crearCuenta);
router.put('/numero/:numero', updateCuenta);

export default router;
