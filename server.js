const express = require('express');
const { generateWord } = require('./functions/generateword');

const app = express();
const port = 3000;

// Middleware para adicionar cabeçalhos CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.15:8080'); // Substitua pela URL do seu frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/word', async (req, res) => {
    try {
        const buffer = await generateWord();
        res.writeHead(200, {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': 'attachment; filename=example.docx',
        });
        res.end(buffer);
    } catch (error) {
        res.status(500).send('Error fetching data' + error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
