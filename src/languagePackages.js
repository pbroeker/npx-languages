const languages = require('./languages.json');
const regions = {
  'European Union': {
    languages: ['bg', 'cs', 'da', 'nl', 'en', 'fi', 'fr', 'de', 'el',
      'hu', 'is', 'it', 'lt', 'lv', 'mt', 'no', 'pl', 'pt', 'sk',
      'sl', 'es', 'sv']
  },

  'South East Asia': {
    languages: [
      'bs', 'my', 'id', 'km', 'lo', 'ms', 'tl', 'th', 'vi'
    ]
  },

  'Africa': {
    languages: [
      'am', 'af', 'ar', 'en', 'fr', 'ha', 'ig', 'om', 'pt', 'sn', 'sw', 'yo'
    ]
  },

  'Manual setup': {
    languages: Object.keys(languages)
  }
}

module.exports = (regionString) => {
  let result = regions[regionString].languages.map(regionCode => {
    return { ...languages[regionCode], content: {}, bcp47: regionCode, native: languages[regionCode].nativeName};
  })
  return result;
}