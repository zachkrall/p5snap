const chalk = require('chalk')

/* Define Error Printing */
const errorMsg = s => console.log(chalk.red.bold(s))

const gridMsg = (title, value) =>
  console.log(`${(title + ':').padEnd(12, ' ')} ${value}`)

module.exports = {
  errorMsg,
  gridMsg
}
