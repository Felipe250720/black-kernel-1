import db from '../config/dbConfig.mjs';

class MesaModel {
  static buscarMesaPorNomeUsuario(nomeUsuario) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM mesa WHERE nome_usuario = ?', [nomeUsuario], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    });
  }

  static criarMesa(nomeUsuario) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO mesa (nome_usuario) VALUES (?)', [nomeUsuario], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, nomeUsuario });
        }
      });
    });
  }

  static listarMesas() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM mesa', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export default MesaModel;
