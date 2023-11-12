import PedidoModel from '../models/pedidoModel.mjs';

class PedidoController {
  static async criarPedido(req, res) {
    const { id_item, id_mesa, qtde } = req.body;

    try {
      const novoPedido = await PedidoModel.criarPedido(id_item, id_mesa, qtde);

      res.json({ mensagem: 'Pedido criado com sucesso', pedido: novoPedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarPedidos(req, res) {
    try {
      const pedidos = await PedidoModel.listarPedidos();

      res.json({ pedidos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async removerPedido(req, res) {
    const { pedidoId } = req.params;

    try {
      const pedidoExistente = await PedidoModel.buscarPedidoPorId(pedidoId);
      if (!pedidoExistente) {
        return res.status(404).json({ mensagem: 'Pedido não encontrado' });
      }

      await PedidoModel.removerPedido(pedidoId);

      res.json({ mensagem: 'Pedido removido com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}

export default PedidoController;