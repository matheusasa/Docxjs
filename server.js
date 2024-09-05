const express = require('express');
const axios = require('axios');
const { generateWord } = require('./functions/generateword');

const app = express();
const port = 3000;

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
