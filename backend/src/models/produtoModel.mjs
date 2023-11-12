import db from '../config/dbConfig.mjs';

class ProdutoModel {
  static criarProduto(nome, valor, quantidade, descricao, marca, grupo) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO produto (nome, valor, quantidade, descricao, marca, grupo) VALUES (?, ?, ?, ?, ?, ?)', [nome, valor, quantidade, descricao, marca, grupo], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, nome, valor, quantidade, descricao, marca, grupo });
        }
      });
    });
  }

  static buscarProdutoPorId(produtoId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM produto WHERE id = ?', [produtoId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  }

  static listarProdutos() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM produto', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export default ProdutoModel;
