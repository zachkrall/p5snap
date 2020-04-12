const fs = require('fs')
const path = require('path')
const README = require('../README.js')
const getContributors = require('./getContributors.js')

getContributors.then((contributors) => {

  // generate readme text
  let file = README(contributors)

  // save text to file
  fs.writeFileSync(
    path.resolve(__dirname, '..', 'README.md'),
    file,
    {encoding: 'UTF-8'}
  )

})
