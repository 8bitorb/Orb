const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Backend da Orb rodando!');
});

app.listen(3000, () => {
    console.log('Servidor backend rodando na porta 3000');
});
