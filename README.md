# npx-languages

## Short Description

An easy way to create select languages, create json-files, translate content and unite them to a single languages.json. 

This one can be used together with the [react-lang-dropdown-package](https://www.npmjs.com/package/react-lang-dropdown) to create quickly a multilingual website.

## Quick-start
Installing the package
```
    npm i npx-languages

```

Choose between language-packages and languages. Check all the languages that you want to use.
```
    npx initlang

    What language package you want to use? (Use arrow keys)
❯ European Union 
  South East Asia 
  Africa 
  Manual setup 

  Which languages you want to add? 
 ◯ Czech
 ◯ Danish
 ◯ Dutch
❯◉ English
 ◯ Finnish
 ◯ French
 ◯ German
```

A languages-folder with a language.json-file for each chosen language will be created. Populate the "content"-property with key-value-pairs of your content in this language 

```json
{
  "name": "English",
  "emoji": "🇬🇧",
  "nativeName": "English",
  "content": {
      "title": "Hello world",
      "Introduction": "Introduction in english."
  },
  "bcp47": "en",
  "native": "English"
}
```

If you want an automatic translation into a language, use the command "npx autotranslate". Choose a language.json-file with a populated content as template. Next choose a target language. Both languages have to be typed by the bcp-47-standards (i.e. "en" for english, "ar" for arabic, etc.).

```
    npx autotranslate

    Type in the language (bcp-47 symbol) to use as template. en
    Type in the language (bcp-47 symbol) to translate to. ar
        Translating en to ar.
        Translation successful. 
        {
        "name": "Arabic",
        "emoji": "🇸🇦",
        "nativeName": "العربية",
        "content": {
            "title": "مرحبا بالعالم",
            "Introduction": "مقدمة باللغة الإنجليزية."
        },
        "bcp47": "ar",
          "currency": {}
        }
    Written new language file
```

Now you have a language.json-file for each language that you want to use. You can use them seperately, add translated content automatically or manually, depending on your language-skills and time. To unite all files into a single languages.json-file, use the command "npx compilelang" and give it the path to the folder where you want to use it. It will create a languages-folder and a languages.json-file inside. This one can i.e. be used with the "react-lang-dropdown"-npm-package, to create a quick dropdown-menu in your react-apps with the specific language-content.

```
    npx compilelang

    npx compilelang
    Type in the relative path of your client-src-directory: ../client/src
```
