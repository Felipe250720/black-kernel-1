import MesaModel from '../models/mesaModel.mjs';

class MesaController {
  static async criarMesa(req, res) {
    const { nomeUsuario } = req.body;

    try {
      const mesaExistente = await MesaModel.buscarMesaPorNomeUsuario(nomeUsuario);
      if (mesaExistente) {
        return res.status(400).json({ mensagem: 'A mesa já está registrada' });
      }

      const novaMesa = await MesaModel.criarMesa(nomeUsuario);

      res.json({ mensagem: 'Mesa criada com sucesso', mesa: novaMesa });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarMesas(req, res) {
    try {
      const mesas = await MesaModel.listarMesas();
      res.json({ mesas });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}

export default MesaController;