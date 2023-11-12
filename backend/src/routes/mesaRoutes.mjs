import express from 'express';
import { mesaController } from '../controller/mesaController.mjs';

const router = express.Router();

router.get('/mesas', mesaController.criarMesa);
router.get('/mesas/:id_mesa/pedidos', mesaController.listarPedidosPorMesa);
router.post('/mesas', mesaController.listarMesas);
router.put('/mesas/:id_mesa', mesaController.atualizarMesa);
router.delete('/mesas/:id_mesa', mesaController.deletarMesa);

export default router;