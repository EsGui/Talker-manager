const fs = require('fs').promises;

const sourceFile = './talker.json';
const encoding = 'utf-8';

async function Person(newPerson) {
  const moduleFs = await fs.readFile(sourceFile, encoding);

  const addNewPerson = JSON.parse(moduleFs);

  addNewPerson.push(newPerson);

  await fs.writeFile(sourceFile, JSON.stringify(addNewPerson));
}

module.exports = Person;