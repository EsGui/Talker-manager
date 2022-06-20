const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const newPerson = require('./newPerson');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// tentando enviar requisito 5: 2 tentativa

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

// Verificação de dados para cadastro -> (Comentário do Dev Guilherme Azevedo da Gama d:D<-<)
function checkToken(Token, res) {
  if (!Token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (Token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function checkName(Name, res) {
  if (!Name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (Name && Name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function checkAge(Age, res) {
  if (!Age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (Age && Age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 
}

function checkTalk(Talk, res) {
  if (!Talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
}

function checkTalkRateRequired(TalkRate, res) {
  if (!TalkRate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
}

function checkTalkRate1a5(TalkRate, res) {
  if (TalkRate && TalkRate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  } if (TalkRate && TalkRate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
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

app.post('/talker', (req, res) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  const data = fs.readFileSync(nomeDoArquivo, 'utf-8');
  // Referência do Regex: Course Trybe (Peguei esse Regex de validação de data no course);
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  checkToken(authorization, res);
  checkName(name, res);
  checkAge(age, res);
  checkTalk(talk, res);
  checkTalkRateRequired(talk.rate, res);
  checkTalkRate1a5(talk.rate, res);
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } if (talk.watchedAt && !dateRegex.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  newPerson({ id: JSON.parse(data).length + 1, name, age, talk });
  return res.status(201).json({ id: JSON.parse(data).length + 1, name, age, talk });
});

app.listen(PORT, () => {
  console.log('Online');
});
