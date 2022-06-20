const fs = require('fs/promises');

const sourceFile = './talker.json';
const encoding = 'utf-8';

async function deletePerson(idPerson) {
  const moduleFs = await fs.readFile(sourceFile, encoding);

  const addDeletePerson = JSON.parse(moduleFs);

  const personIndex = addDeletePerson
    .findIndex((element) => Number(element.id) === Number(idPerson));

  addDeletePerson.splice(personIndex, 1);

  await fs.writeFile(sourceFile, JSON.stringify(addDeletePerson));
}

module.exports = deletePerson;