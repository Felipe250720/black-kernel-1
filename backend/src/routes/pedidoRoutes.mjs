import express from 'express';
import { pedidoController } from '../controller/pedidoController.mjs';

const router = express.Router();

router.post('/pedidos', pedidoController.criarPedido);
router.get('/pedidos', pedidoController.listarPedidos);
router.put('/pedidos/:id', pedidoController.atualizarPedido);
router.delete('/pedidos/:id', pedidoController.deletarPedido);

export default router;
