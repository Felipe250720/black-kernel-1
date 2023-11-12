import db from '../config/dbConfig.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class FuncionarioModel {
  static async criarFuncionario(nome, senha) {
    try {
      const hashSenha = await bcrypt.hash(senha, 10)

      const query = `
        INSERT INTO funcionario (nome, senha) VALUES (?, ?);
      `;

      const params = [nome, hashSenha];

      await db.run(query, params);

    } catch (err) {
      console.error('Erro ao criar funcionário', err);
    }
  }

  static async verificarCredenciais(nome, senha) {
    const funcionario = await db.get('SELECT * FROM funcionario WHERE nome = ?', [nome]);

    if (!funcionario) {
      return null;
    }

    const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);

    if (senhaCorreta) {
      return funcionario;
    }

    return null;
  }

  static gerarToken(funcionario) {
    const payload = {
      id: funcionario.id,
      nome: funcionario.nome,
    };

    const token = jwt.sign(payload, 'SeuSegredo', { expiresIn: '1h' }); // Altere 'SeuSegredo' conforme necessário

    return token;
  }
}

export default FuncionarioModel;