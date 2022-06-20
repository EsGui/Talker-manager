const fs = require('fs/promises');

const sourceFile = './talker.json';
const encoding = 'utf-8';

async function changePerson(name, age, talk, idPerson) {
  const moduleFs = await fs.readFile(sourceFile, encoding);

  const addChangePerson = JSON.parse(moduleFs);

  const personIndex = addChangePerson
    .findIndex((element) => Number(element.id) === Number(idPerson));

  addChangePerson[personIndex] = { ...addChangePerson[personIndex], name, age, talk };

  await fs.writeFile(sourceFile, JSON.stringify(addChangePerson));
}

module.exports = changePerson;