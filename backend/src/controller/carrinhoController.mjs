// app/controllers/carrinhoController.mjs
import CarrinhoModel from '../models/carrinhoModel.mjs';

class CarrinhoController {
  static async adicionarProdutoAoCarrinho(req, res) {
    const clienteId = req.usuario.id;
    const { produtoId, quantidade } = req.body;

    try {
      const itemCarrinhoId = await CarrinhoModel.adicionarProdutoAoCarrinho(clienteId, produtoId, quantidade);
      res.json({ mensagem: 'Produto adicionado ao carrinho com sucesso', id: itemCarrinhoId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarProdutosDoCarrinho(req, res) {
    const clienteId = req.usuario.id;

    try {
      const produtosNoCarrinho = await CarrinhoModel.listarProdutosDoCarrinho(clienteId);
      res.json({ produtos: produtosNoCarrinho });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}

export default CarrinhoController;
