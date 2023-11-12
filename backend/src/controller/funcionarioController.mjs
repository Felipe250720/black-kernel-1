import { funcionarioModel } from "../models/funcionarioModel.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const sKey = 'SemMemeEuAindaTenhoVontadeDeConversarComADitaCuja'

export class funcionarioController {
    static async registro(req,res) {
        const { username, password } = req.body;

        try {
            const func = await funcionarioModel.findUserByUsername(username);

            if (user) {
                res.status(400).json({ mensagem: 'Nome de usuário já existe' });
                return;
            }


            const hash = await bcrypt.hash(password, 10);
            const result = await funcionarioModel.createUser(username, hash);

            res.json({ mensagem: 'Registro bem-sucedido', UserId: result.id })
        } catch (err) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;

        try{
            const user = await funcionarioModel.findUserByUsername(username);
            
            if(!user) {
                res.status(401).json({ mensagem: 'Credenciais inválidas' });
                return;
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                res.status(401).json({ mensagem: 'Credenciais inválidas' });
                return;
            }

            const token = jwt.sign({ id: user.id, username: user.username }, sKey, {expiresIn: '1h'} )
            res.json({ mensagem: 'Login bem-sucedido', token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro interno do servidor' })
        }
    }
}

export async function createTableFuncionario() {
    try {
        const db = new sqlite3.Database(dbConfig.databaseFile, dbConfig.options);

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS funcionario(
            id_funcionario INTEGER PRIMARY KEY NOT NULL,
            username TEXT NOT NULL,
            senha TEXT NOT NULL
        );
    `;

        await db.exec(createTableQuery);
    } catch (err) {
        console.log('Erro ao criar tabela "funcionario":', err)
    }
}

export async function insertTableFuncionario() {
    
}