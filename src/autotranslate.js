#!/usr/bin/env node

const inquirer = require('inquirer');
const fetch = require('node-fetch');
const fs = require('fs');
const allLanguages = require('./languages.json');
const languageFiles = fs.readdirSync('./languages');

const questions = [
{ type: 'input', name: 'transInput', message: 'Type in the language (bcp-47 symbol) to use as template.' },
  { type: 'input', name: 'transOutput', message: 'Type in the language (bcp-47 symbol) to translate to.' }
]

inquirer
  .prompt(questions)
  .then(answers => {
    const input = answers.transInput;
    const output = answers.transOutput;
    if (!checkForLang(input, output)) throw new Error('input or output language doesn\'t exist.');
    console.log(`Translating ${input} to ${output}.`);
    let result = translate(input, output)
    return result;
  })
  .then((result) => {
    const resultJson = JSON.stringify(result, null, 2);
    console.log(`Translation successful. ${resultJson}`);
    fs.writeFile(`./languages/${result['bcp47'].toLowerCase()}.languages.json`, resultJson, (err, res) => {
      if (err) console.log(err);
      console.log('Written new language file')
    })
  })
  .catch(err => console.log(err));


// Helper
const checkForLang = (input, output) => {
  return languageFiles.includes(`${input.toLowerCase()}.languages.json`) && allLanguages[output.toLowerCase()];
}

const translate = async (input, output) => {
  const rawInput = await fs.readFileSync(`./languages/${input.toLowerCase()}.languages.json`);
  const inputObject = JSON.parse(rawInput);
  let outputObject = { ...allLanguages[output], content: {}, bcp47: output, currency: {} };

  let entries = Object.entries(inputObject.content);

  let promisedEntries = entries.map( async (elementArray) => {

    let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
      + `${input}` + "&tl=" + `${output}` + "&dt=t&q=" + encodeURI(`${elementArray[1]}`);
  
    let tempResult = await fetch(url);
    let result = await tempResult.json();
    return [elementArray[0], result[0][0][0]];
    })
  
  let newEntries = await Promise.all(promisedEntries);
  newEntries.forEach(([key, value]) => outputObject.content[key] = value);
  return outputObject;
} 
