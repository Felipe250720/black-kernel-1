// /app/models/PedidoModel.mjs
import sqlite3 from 'sqlite3';
import dbConfig from '../config/dbConfig.mjs';

const db = new sqlite3.Database(dbConfig.databaseFile, dbConfig.options);

export class pedidoModel {
  static criarPedido(idItem, idMesa, qtde, idFuncionario) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO pedidos (id_item, id_mesa, qtde, id_funcionario) VALUES (?, ?, ?, ?)', [idItem, idMesa, qtde, idFuncionario], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static listarPedidos() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM pedidos', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static listarPedidosPorMesa(idMesa) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM pedidos WHERE id_mesa = ?', [idMesa], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
