import express from 'express';
import CarrinhoController from '../controller/carrinhoController.mjs';
import { verificarToken } from '../auth.mjs';

const router = express.Router();

router.post('/carrinho', verificarToken, CarrinhoController.adicionarProdutoAoCarrinho);
router.get('/carrinho', verificarToken, CarrinhoController.listarProdutosDoCarrinho);

export default router;
