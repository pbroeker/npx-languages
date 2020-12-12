#!/usr/bin/env node

const inquirer = require('inquirer');
const languagePackages = require('./languagePackages');
const fs = require('fs');

  const packageQuestions = [
    { type: 'list', name: 'languagePackage', message: 'What language package you want to use?', choices: [{ name: 'European Union' }, { name: 'South East Asia' }, {name: 'Africa'}, { name: 'Manual setup' }] },
  ]
  
  inquirer
  .prompt(packageQuestions)
  .then(answers => {
    const languages = languagePackages(answers.languagePackage);
    console.log(languages)
  
    const languageQuestions = [
      {type: 'checkbox', name: 'languageCheckbox', message: 'Which languages you want to add?', choices: languages}
    ]
  
    inquirer
    .prompt(languageQuestions)
    .then(answers => {
      fs.mkdirSync(`./languages`, { recursive: true }, (err) => {console.log(err)})
      answers.languageCheckbox.forEach(element => {
        const languageElement = languages.find(language => language.name === element)
        console.log(languageElement);
        const jsonElement = JSON.stringify(languageElement, null, 2);
        fs.writeFileSync(`./languages/${languageElement.bcp47}.languages.json`, jsonElement);
        });
    })
  })
