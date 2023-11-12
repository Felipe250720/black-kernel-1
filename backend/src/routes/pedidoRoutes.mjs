import express from 'express';
import pedidoController from '../controller/pedidoController.mjs';

const router = express.Router();

router.post('/pedidos', pedidoController.criarPedido);
router.get('/pedidos', pedidoController.listarPedidos);

export default router;
