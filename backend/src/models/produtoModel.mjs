// /app/models/ProdutoModel.mjs
import sqlite3 from 'sqlite3';
import dbConfig from '../config/dbConfig.mjs';

const db = new sqlite3.Database(dbConfig.databaseFile, dbConfig.options);

export class produtoModel {
  static criarProduto(nomeProduto, quantidade, valorProduto) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO produtos (nome_produto, quantidade, valor_produto) VALUES (?, ?, ?)', [nomeProduto, quantidade, valorProduto], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static listarProdutos() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM produtos', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static atualizarProduto(produto) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE produtos SET nome_produto = ?, quantidade = ?, valor_produto = ? WHERE id = ?', [produto.nome_produto, produto.quantidade, produto.valor_produto, produto.id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static deletarProduto(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // Implemente outros métodos CRUD necessários para a entidade Produto
}
