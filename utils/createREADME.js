const fs      = require('fs')
const path    = require('path')
const https   = require('https')
const package = require('../package.json')

let url = 'https://api.github.com/repos/' + package
  .repository
  .url
  .replace('git+https://github.com/','')
  .replace('.git','/contributors')

let json = ''

https.get(url, {
  headers: {
    'user-agent': 'node.js'
  }
},(res) => {
  res.on('data', (d) => {
    json += d
  })
}).on('error', (e) => {
  console.error(e)
}).on('close', () => {
  writeREADME({
    contributors: JSON.parse(json)
  })
});

function writeREADME({ contributors } = {}){
  let markdown = `
<img src="./p5snap.png" height="70px"/></div>

<a href="https://github.com/zachkrall/p5snap/issues/"><img src="https://img.shields.io/github/issues/zachkrall/p5snap.svg" height="20px"/></a>
<a href="https://github.com/zachkrall/p5snap/pulls"><img src="https://img.shields.io/github/issues-pr/zachkrall/p5snap"/></a>
<a href="https://github.com/zachkrall/p5snap/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22"><img src="https://img.shields.io/github/labels/zachkrall/p5snap/help%20wanted"/></a>
<a href="https://github.com/zachkrall/p5snap/commits"><img src="https://img.shields.io/github/last-commit/zachkrall/p5snap.svg" height="20px"/></a>
<br/>
<a href="https://npmjs.com/package/p5snap/"><img src="https://img.shields.io/npm/dy/p5snap"/></a>
<a href="https://github.com/zachkrall/p5snap/graphs/contributors"><img src="https://img.shields.io/github/contributors/zachkrall/p5snap"></a>
<a href="http://newschool.edu"><img src="https://img.shields.io/badge/made%20at-The%20New%20School-E82E21.svg" height="20px"/></a>

## about

**p5snap** is a command-line interface that creates and saves snapshots of a p5 sketch

## installation

with \`npm\`:
\`\`\`shell
npm -g install p5snap
\`\`\`

## usage

to start p5snap, provide a relative file path and the number of images that should be saved

\`\`\`shell
p5snap <FILE-PATH> -n <NUMBER-OF-IMAGES>
\`\`\`

for example:
\`\`\`shell
p5snap ./mySketch.js -n 20
\`\`\`

will create:<br/>
• mySketch_0.png<br/>
• mySketch_1.png<br/>
• mySketch_2.png<br/>
• ...<br/>
• mySketch_19.png

![Example](example.png)

### instance mode

if your sketch is written as a p5 instance, you can use the \`--instance\` flag to execute <span style="color:#ED225D">**p5snap**</span> in instance mode

instance mode does not require \`new p5()\`

[view example code for instance mode sketches](./examples/instance.js)

## limitations

**p5snap** currently only saves a single \`<canvas/>\` context. If your p5 drawing uses or draws DOM elements, it will not be included in the image.

## contributing
Contributions, issues and feature requests are welcome.<br/>Feel free to check [issues](https://github.com/zachkrall/p5snap/issues/) page if you want to contribute.

`

  contributors.forEach( ({login,avatar_url,html_url}) => {
    markdown += `<img src="${avatar_url}" width="20" height="20"/> <a href="${html_url}">${login}</a><br/>`
  })

markdown += `

## license
Copyright © 2020 [Zach Krall](https://zachkrall.com)<br/>This project is [MIT](https://github.com/zachkrall/p5snap/blob/master/LICENSE) licensed.

File Updated on ${(new Date()).toLocaleString()}
`

  fs.writeFileSync(path.resolve(__dirname, '..', 'README.md'), markdown, {encoding: 'UTF-8'})
}
