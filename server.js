const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/reservas', (req, res) => {
    const { nome, email, categoria } = req.body;

    if (!nome || !email || !categoria) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    // 1️⃣ Inserir cliente
    db.query(
        'INSERT INTO clientes (nome, email) VALUES (?, ?)',
        [nome, email],
        (err, resultadoCliente) => {
            if (err) return res.status(500).json(err);

            const clienteId = resultadoCliente.insertId;

            // 2️⃣ Buscar veículo disponível
            db.query(
                'SELECT id FROM veiculos WHERE categoria = ? AND disponivel = true LIMIT 1',
                [categoria],
                (err, resultadoVeiculo) => {
                    if (err) return res.status(500).json(err);

                    if (resultadoVeiculo.length === 0) {
                        return res.json({ mensagem: "Nenhum veículo disponível." });
                    }

                    const veiculoId = resultadoVeiculo[0].id;

                    // 3️⃣ Criar reserva
                    db.query(
                        'INSERT INTO reservas (cliente_id, veiculo_id) VALUES (?, ?)',
                        [clienteId, veiculoId],
                        (err) => {
                            if (err) return res.status(500).json(err);

                            // 4️⃣ Atualizar disponibilidade
                            db.query(
                                'UPDATE veiculos SET disponivel = false WHERE id = ?',
                                [veiculoId]
                            );

                            res.json({ mensagem: "Reserva realizada com sucesso!" });
                        }
                    );
                }
            );
        }
    );
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});