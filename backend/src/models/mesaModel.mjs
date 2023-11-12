// /app/models/MesaModel.mjs
import sqlite3 from 'sqlite3';
import dbConfig from '../config/dbConfig.mjs';

const db = new sqlite3.Database(dbConfig.databaseFile, dbConfig.options);

export class mesaModel {
  static criarMesa(idMesa, nomeUsuario, idPedido) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO mesas (id_mesa, nome_usuario, id_pedido) VALUES (?, ?, ?)', [idMesa, nomeUsuario, idPedido], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static listarMesas() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM mesas', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static atualizarMesa(mesa) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE mesas SET nome_usuario = ?, id_pedido = ? WHERE id_mesa = ?', [mesa.nome_usuario, mesa.id_pedido, mesa.id_mesa], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static deletarMesa(idMesa) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM mesas WHERE id_mesa = ?', [idMesa], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
