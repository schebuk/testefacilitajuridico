// index.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testefacilitajuridico',
    password: '1234',
    port: 5432,
});

const { bruteForceTSP } = require('./algoritmos');


app.use(cors());
app.use(express.json());

// Rota para listar clientes
app.get('/clientes', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM clientes');
    res.json(rows);
});

// Rota para adicionar novo cliente com coordenadas X e Y
app.post('/clientes', async (req, res) => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    await pool.query('INSERT INTO clientes(nome, email, telefone, coordenada_x, coordenada_y) VALUES($1, $2, $3, $4, $5)', [nome, email, telefone, coordenada_x, coordenada_y]);
    res.send('Cliente adicionado com sucesso!');
});

app.get('/rota', async (req, res) => {
    const { rows } = await pool.query('SELECT id, coordenada_x, coordenada_y FROM clientes');
    const rotaOtima = bruteForceTSP(rows);
    res.json(rotaOtima);
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
