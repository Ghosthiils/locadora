const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'locadora'
});

conexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar:', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

module.exports = conexao;






app.post('/agendamentos', (req, res) => {
    const { nome, email, categoria } = req.body;

    if (!nome || !email || !categoria) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    db.query(
        'INSERT INTO agendamentos (nome_cliente, email_cliente, categoria) VALUES (?, ?, ?)',
        [nome, email, categoria],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({ mensagem: "Dados salvos com sucesso!" });
        }
    );
});




fetch('http://localhost:3000/agendamentos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nome: nome,
        email: email,
        categoria: tipoVeiculo
    })
})
.then(res => res.json())
.then(data => {
    alert(data.mensagem);
});

