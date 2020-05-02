const jsdom = require('jsdom')

const { JSDOM } = jsdom

const virtualdom = new JSDOM(``, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true
})

module.exports = virtualdom
