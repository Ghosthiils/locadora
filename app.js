const formulario = document.querySelector('.pedido');
const campos = document.querySelectorAll('.campo-texto');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = campos[0].value.trim();
    const email = campos[1].value.trim();
    const tipoVeiculo = campos[2].value;

    if (nome === '' || email === '' || tipoVeiculo === '') {
        alert("Preencha todos os campos!");
        return;
    }

    alert("Reserva realizada !");
});


const express = require('express');
const app = express();

app.use(express.json());

app.post('/reservas', (req, res) => {
    const { nome, email, tipoVeiculo } = req.body;

    if (!nome || !email || !tipoVeiculo) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    res.status(201).json({ mensagem: "Reserva criada com sucesso!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


fetch('http://localhost:3000/reservas', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nome: nome,
        email: email,
        tipoVeiculo: tipoVeiculo
    })
});


