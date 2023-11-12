import jwt from 'jsonwebtoken';

const segredo = 'TesteParaSegredoPorqueTaComplicadoEscolherUm';

const criarToken = (dados) => {
  return jwt.sign(dados, segredo, { expiresIn: '1h' });
};

const verificarToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação não fornecido' });
  }

  try {
    const decodificado = jwt.verify(token, segredo);
    req.usuario = decodificado;
    next();
  } catch (err) {
    res.status(401).json({ mensagem: 'Token de autenticação inválido' });
  }
};

export { criarToken, verificarToken };