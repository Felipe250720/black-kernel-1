import express from 'express';
import { produtoController } from '../controller/produtoController.mjs';

const router = express.Router();

router.post('/produtos', produtoController.criarProduto);
router.get('/produtos', produtoController.listarProdutos);
router.put('/produtos/:id', produtoController.atualizarProduto);
router.delete('/produtos/:id', produtoController.deletarProduto);

export default router;
