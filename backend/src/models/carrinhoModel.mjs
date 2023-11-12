import db from '../config/dbConfig.mjs';

class CarrinhoModel {
  static adicionarProdutoAoCarrinho(clienteId, produtoId, quantidade) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO carrinho (cliente_id, produto_id, quantidade) VALUES (?, ?, ?)', [clienteId, produtoId, quantidade], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }

  static listarProdutosDoCarrinho(clienteId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT produto.nome, produto.valor, carrinho.quantidade FROM carrinho JOIN produto ON carrinho.produto_id = produto.id WHERE carrinho.cliente_id = ?', [clienteId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export default CarrinhoModel;
