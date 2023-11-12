import express from 'express';
import { funcionarioController } from '../controller/funcionarioController.mjs';

const router = express.Router();

router.post('/registro', funcionarioController.registro)
router.post('/login', funcionarioController.login)

export default router;