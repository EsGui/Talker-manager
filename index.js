const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const nomeDoArquivo = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const data = fs.readFileSync(nomeDoArquivo, 'utf-8');
  if (data.length > 0) {
    response.status(200).json(JSON.parse(data));
  } else {
    response.status(200).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
