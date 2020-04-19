/*

  README.js

  This file constructs markdown text
  and saves it as README.md

*/
const Markdown = require('./utils/Markdown.js')

const README = (contributors_json) => {

  let contributors = JSON.parse(contributors_json)
  let md = new Markdown()

  /* ADD HEADER */
  md
  .text(`<img src="./images/p5snap.png" height="70px"/>`)
  .text(`<a href="https://github.com/zachkrall/p5snap/issues/"><img src="https://img.shields.io/github/issues/zachkrall/p5snap.svg" height="20px"/></a>
<a href="https://github.com/zachkrall/p5snap/pulls"><img src="https://img.shields.io/github/issues-pr/zachkrall/p5snap"/></a>
<a href="https://github.com/zachkrall/p5snap/commits"><img src="https://img.shields.io/github/last-commit/zachkrall/p5snap.svg" height="20px"/></a>
<br/>
<a href="https://npmjs.com/package/p5snap/"><img src="https://img.shields.io/npm/dy/p5snap"/></a>
<a href="https://github.com/zachkrall/p5snap/graphs/contributors"><img src="https://img.shields.io/github/contributors/zachkrall/p5snap"></a>
<a href="http://newschool.edu"><img src="https://img.shields.io/badge/made%20at-The%20New%20School-E82E21.svg" height="20px"/></a>`)

  /* ABOUT */
  md
  .h2(`about`)
  .text(`**p5snap** is a command-line interface that creates and saves snapshots of a p5 sketch`)

  /* INSTALLATION */
  md
  .h2(`installation`)
  .text(`with \`npm\`:`)
  .code(`npm -g install p5snap`,`shell`)

  /* USAGE */
  .h2(`usage`)
  .text(`to start p5snap, provide a relative file path and the number of images that should be saved`)
  .code(`p5snap <FILE-PATH> -n <NUMBER-OF-IMAGES>`, `shell`)
  .text(`for example:`)
  .code(`p5snap ./mySketch.js -n 20`, `shell`)
  .text(`will create:<br/>
  • mySketch_0.png<br/>
  • mySketch_1.png<br/>
  • mySketch_2.png<br/>
  • ...<br/>
  • mySketch_19.png`)
  .image(`Example`,`./images/example.png`)

  // module mode
  md
  .h3(`as a module`)
  .text(`you can bring p5snap into your existing node.js build tools by importing the snap module.`)
  .text(`for example:`)
  .code(`const path = require('path')
const snap = require('p5snap/modules/snap.js')

snap({
  sketch_path: path.resolve(__dirname, './mySketch.js'),
  output_path: path.resolve(__dirname),
  width: 1920,
  height: 1080,
  instance: false,
  filename: 'mySketch',
})`)

  /* INSTANCE MODE */
  md
  .h3(`instance mode`)
  .text(`if your sketch is written as a p5 instance, you can use the \`--instance\` flag to execute **p5snap** in instance mode`)
  .text(`instance mode does not require \`new p5()\``)
  .text(`[view example code for instance mode sketches](./examples/instance.js)`)

  /* LIMITATIONS */
  md
  .h2(`limitations`)
  .text(`**p5snap** currently only saves a single \`<canvas/>\` context. If your p5 drawing uses or draws DOM elements, it will not be included in the image.`)

  /* CONTRIBUTING */
  md
  .h2(`contributing`)
  .text(`Contributions, issues and feature requests are welcome.<br/>Feel free to check [issues](https://github.com/zachkrall/p5snap/issues/) page if you want to contribute.`)
  .text(`Check the <a href="https://github.com/zachkrall/p5snap/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22"><img src="https://img.shields.io/github/labels/zachkrall/p5snap/help%20wanted"/></a> tag for suggestions on features to work on.`)

  /* add all contributors to readme */
  let contributors_string = contributors
    .map(({
      login,
      avatar_url,
      html_url,
      contributions
    }) => {
      let entry = `<img src="${avatar_url}" width="20" height="20"/> `
        entry += `<a href="${html_url}">${login}</a> `
        entry += `(${contributions})<br/> `
      return entry
    })
    .join('')

  md.text(contributors_string)

  /* LICENSE */
  md
  .h2(`license`)
  .text(`Copyright © 2020 [Zach Krall](https://zachkrall.com).<br/>This project is [MIT](https://github.com/zachkrall/p5snap/blob/master/LICENSE) licensed.`)

  /* FOOTER */
  md
  .text(``)
  .text(`_Last Updated: ${(new Date()).toUTCString()}_`)

  return md.value
}

module.exports = README
