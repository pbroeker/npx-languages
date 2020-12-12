#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
let clientDirectory = '';

inquirer
  .prompt([{type: 'input', name: 'directoryQuestion', message: 'Type in the relative path of your client-src-directory:'}])
  .then(answer => {
    clientDirectory = answer.directoryQuestion;
    fs.mkdirSync(`${clientDirectory}/lang`, { recursive: true }, (err) => {console.log(err)})
  })
  .then(() =>{
    fs.readdir('./languages', (err, files) =>{
        if (err) console.log(err);
        let languagesObject = {};
        files.forEach(file => {
            const rawData = fs.readFileSync(`./languages/${file}`);
            const object = JSON.parse(rawData);
            languagesObject[object.bcp47] = object;
        });
        const jsonObject = JSON.stringify(languagesObject, null, 2)
        fs.writeFileSync(`${clientDirectory}/lang/languages.json`, jsonObject)
        });
    })