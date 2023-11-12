import db from '../config/dbConfig.mjs';

class PedidoModel {
  static criarPedido(id_item, id_mesa, qtde) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO pedido (mesa_id, cliente_id) VALUES (?, ?, ?)', [id_item ,id_mesa, qtde], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, mesaId, clienteId });
        }
      });
    });
  }

  static buscarPedidoPorId(pedidoId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM pedido WHERE id = ?', [pedidoId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  }

  static listarPedidos() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM pedido', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export default PedidoModel;
