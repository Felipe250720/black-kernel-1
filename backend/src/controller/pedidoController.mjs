import { pedidoModel } from '../models/pedidoModel.mjs';

export class pedidoController {
  static async criarPedido(req, res) {
    const { id_item, id_mesa, qtde, id_funcionario } = req.body;

    try {
      const result = await pedidoModel.criarPedido(id_item, id_mesa, qtde, id_funcionario);

      res.json({ mensagem: 'Pedido criado com sucesso', pedidoId: result.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarPedidos(req, res) {
    try {
      const pedidos = await pedidoModel.listarPedidos();

      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static atualizarPedido(pedido) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE pedidos SET id_item = ?, id_mesa = ?, qtde = ?, id_funcionario = ? WHERE id = ?', [pedido.id_item, pedido.id_mesa, pedido.qtde, pedido.id_funcionario, pedido.id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  static deletarPedido(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM pedidos WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }  
}