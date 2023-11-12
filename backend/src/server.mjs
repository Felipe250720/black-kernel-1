//  Importação das libs que serão usadas
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//  Importação das configurações do banco de dados
import dbConfig from './config/dbConfig.mjs';

//  Importações das rotas do serviço 
import produtoRoutes from './routes/produtoRoutes.mjs';
import funcionarioRoutes from './routes/funcionarioRoutes.mjs';
import mesaRoutes from './routes/mesaRoutes.mjs';
import pedidoRoutes from './routes/pedidoRoutes.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

import sqlite3 from 'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database(dbConfig.databaseFile, dbConfig.options);

app.use('/api', produtoRoutes);
app.use('/api', mesaRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', funcionarioRoutes);

app.get('/api/status', (req,res) => {
    res.json({ status: 'Servidor ativo' });
});

app.listen(port, () => {
    console.log('rodando')
})