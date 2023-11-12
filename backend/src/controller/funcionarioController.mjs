import funcionarioModel from '../models/funcionarioModel.mjs';

class funcionarioController {
  static async criarFuncionario(req, res) {
    const { nome, senha } = req.body;

    try {
      await funcionarioModel.criarFuncionario(nome, senha);
      res.json({ mensagem: 'Funcionário criado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async autenticarFuncionario(req, res) {
    const { nome, senha } = req.body;

    try {
      const funcionario = await funcionarioModel.verificarCredenciais(nome, senha);

      if (funcionario) {
        const token = funcionarioModel.gerarToken(funcionario);
        res.json({ mensagem: 'Autenticação bem-sucedida', token });
      } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}

export default funcionarioController;