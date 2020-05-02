const project = require('../package.json')

const cli = require('yargs')
  .usage(
    `📷 ${project.name} v${project.version}
${project.description}

Usage: $0 <filepath> [options]`
  )
  // options
  // number of images to save
  .describe('n', 'Number of images to save')
  .alias('n', 'num')
  .default('n', 1)
  // delay
  .describe('d', 'Delay between snaps in milliseconds')
  .alias('d', 'delay')
  .default('d', 0)
  // output
  .describe('o', 'Output Dir (Defaults to Current Directory)')
  .alias('o', 'out-dir')
  // instance mode
  .describe('instance', "Use p5 in 'instance' mode")
  .alias('i', 'instance')
  .help('h')
  // window dimensions
  .describe('width', 'Set window width')
  .default('width', 1920)
  .describe('height', 'Set window height')
  .default('height', 1080)
  .alias('v', 'verbose')
  .describe('v', 'Verbose output mode')
  // help
  .help('h')
  .alias('h', 'help')
  .describe('h', 'Show help')
  .default('help', false)
  // EXAMPLES
  .example('$0 sketch.js', '')
  .example('$0 --instance -f sketch.js', '(Sketch uses instance mode)')
  // EPILOG
  .epilog(`For more information: ${project.homepage}`)

module.exports = cli
