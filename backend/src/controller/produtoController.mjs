// /app/controllers/ProdutoController.mjs
import { produtoModel } from '../models/produtoModel.mjs';

export class produtoController {
  static async criarProduto(req, res) {
    const { nome_produto, quantidade, valor_produto } = req.body;

    try {
      const result = await produtoModel.criarProduto(nome_produto, quantidade, valor_produto);

      res.json({ mensagem: 'Produto criado com sucesso', produtoId: result.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarProdutos(req, res) {
    try {
      const produtos = await produtoModel.listarProdutos();

      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async atualizarProduto(req, res) {
    const { id } = req.params;
    const { nome_produto, quantidade, valor_produto } = req.body;

    try {
      const produto = await produtoModel.getProdutoById(id);

      if (!produto) {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
        return;
      }
      
      produto.nome_produto = nome_produto;
      produto.quantidade = quantidade;
      produto.valor_produto = valor_produto;

      await produtoModel.atualizarProduto(produto);

      res.json({ mensagem: 'Produto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async deletarProduto(req, res) {
    const { id } = req.params;

    try {
      const produto = await produtoModel.getProdutoById(id);

      if (!produto) {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
        return;
      }

      await produtoModel.deletarProduto(id);

      res.json({ mensagem: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}
