import express from 'express';
import funcionarioController from '../controller/funcionarioController.mjs';

const router = express.Router();

router.post('/registro', funcionarioController.criarFuncionario);
router.get('/login', funcionarioController.autenticarFuncionario);

export default router;
