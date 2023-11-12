import { mesaModel } from '../models/mesaModel.mjs';
import { pedidoModel } from '../models/pedidoModel.mjs';

export class mesaController {
  static async criarMesa(req, res) {
    const { id_mesa, nome_usuario, id_pedido } = req.body;

    try {
      const result = await mesaModel.criarMesa(id_mesa, nome_usuario, id_pedido);

      res.json({ mensagem: 'Mesa criada com sucesso', mesaId: result.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarMesas(req, res) {
    try {
      const mesas = await mesaModel.listarMesas();

      res.json(mesas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async atualizarMesa(req, res) {
    const { id_mesa } = req.params;
    const { nome_usuario, id_pedido } = req.body;

    try {
      const mesa = await mesaModel.getMesaById(id_mesa);

      if (!mesa) {
        res.status(404).json({ mensagem: 'Mesa não encontrada' });
        return;
      }

      mesa.nome_usuario = nome_usuario;
      mesa.id_pedido = id_pedido;

      await mesaModel.atualizarMesa(mesa);

      res.json({ mensagem: 'Mesa atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async deletarMesa(req, res) {
    const { id_mesa } = req.params;

    try {
      const mesa = await mesaModel.getMesaById(id_mesa);

      if (!mesa) {
        res.status(404).json({ mensagem: 'Mesa não encontrada' });
        return;
      }

      await mesaModel.deletarMesa(id_mesa);

      res.json({ mensagem: 'Mesa excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarPedidosPorMesa(req, res) {
    const { id_mesa } = req.params;

    try {
      const pedidos = await pedidoModel.listarPedidosPorMesa(id_mesa);

      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}