const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const nomeDoArquivo = 'talker.json';

function validEmail(email, res) {
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!email.includes('@')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
}

function validPassword(password, res) {
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
}

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

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(nomeDoArquivo, 'utf-8');
  console.log(typeof JSON.parse(data).length);
  const talker = JSON.parse(data).find((talk) => talk.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  if (email && password && password.length > 6 && email
    .includes('@')) return res.status(200).json({ token });
  validEmail(email, res);
  validPassword(password, res);
});

app.listen(PORT, () => {
  console.log('Online');
});
