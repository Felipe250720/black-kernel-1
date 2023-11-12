import express from 'express';
import mesaController from '../controller/mesaController.mjs';

const router = express.Router();

router.get('/mesas', mesaController.criarMesa);
router.post('/mesas', mesaController.listarMesas);

export default router;