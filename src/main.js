/*

  ██████╗ ███████╗███████╗███╗   ██╗ █████╗ ██████╗
  ██╔══██╗██╔════╝██╔════╝████╗  ██║██╔══██╗██╔══██╗
  ██████╔╝███████╗███████╗██╔██╗ ██║███████║██████╔╝
  ██╔═══╝ ╚════██║╚════██║██║╚██╗██║██╔══██║██╔═══╝
  ██║     ███████║███████║██║ ╚████║██║  ██║██║
  ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝

  command-line tool for creating image frames
  from a p5.js sketch

*/
const package   = require('../package.json')

const fs        = require('fs')
const path      = require('path')

const chalk     = require('chalk')
const jsdom     = require('jsdom')

const { JSDOM } = jsdom;
const dom       = new JSDOM(`...`, { runScripts: "outside-only" })

/*
  CLI
*/
const argv = require('yargs')
  .usage(`📷 ${chalk.bold(chalk.blue(package.name))}
${package.description}

Usage: $0 <command> [options]`)
  // .command('capture', 'Create a capture')
  .example('$0 sketch.js', '')
  .example('$0 --instance -f sketch.js', '(Sketch uses instance mode)')
  // .alias('f', 'file')
  // .nargs('f', 1)
  // .describe('f', 'Set file path')
  // .demandOption(['f'])
  .alias('n', 'num')
  .describe('n', 'Number of images to save')
  .default('n', 1)
  .describe('instance', 'Sketch file uses p5 in \'instance\' mode')
  .alias('i', 'instance')
  .help('h')
  .alias('h', 'help')
  .epilog('☺️ ✨')
  .argv;

/*
  Create the virtual window environment
*/
global.window            = dom.window
global.document          = window.document
global.screen            = window.screen
global.navigator         = window.navigator
global.HTMLCanvasElement = window.HTMLCanvasElement

/*
  Require p5 after virtual dom is set up
*/
const p5 = require('p5')

/*
  Save Canvas Function
*/
const save = require('./save')

/*
  Parameters
*/
const input_path      = argv._[0]
const current_dir     = process.cwd()
const sketch_file     = path.resolve(current_dir, input_path)
const sketch_contents = fs.readFileSync(sketch_file, {encoding: 'UTF-8'})
const filename        = input_path.match(/[A-z]*.js$/g)[0].replace(/.js/,'')

const mode = argv.i ? 'instance' : 'global'
/*
  Interval Counter
*/
let int = 0

console.log(`📷 ${chalk.blue(chalk.bold(package.name))}`)
console.log(``)
console.log(`Filename:  ${chalk.underline(filename)}`)

if(mode == 'global'){
  /*
    GLOBAL MODE
  */
  console.log('p5 Mode:   Default (Global)')
  console.log(` `)

  // ... set timeout used for waiting for virtual dom to "load"
  // TODO: use window.onload event?
  setTimeout( ()=>{
    window.eval(`${sketch_contents}`)
    new p5()
    window.eval(`noLoop()`)

    setInterval( ()=>{
      window.eval(`_draw()`)

      // there should only be a single canvas in our dom
      let canvas = document.querySelector('canvas')

      let save_filename = argv.n > 1 ? filename + '_' + int : filename

      save({
        canvas: canvas,
        filename: save_filename,
        dir: current_dir
      })

      int++

      if(int >= argv.n) process.exit(0)
    }, 100)
  }, 500)
} else {
  /*
    INSTANCE MODE
  */
  let sketch
  console.log('p5 Mode:   Instance')
  console.log(` `)

  // there must be a better way to 'wait'
  // for the fake dom to update after loading p5...
  setTimeout( ()=>{
    eval(`sketch = new p5(${sketch_contents})`)
    eval(`sketch.noLoop()`)
    eval(`sketch._draw()`)

    setInterval( ()=>{
      eval(`sketch._draw()`)
      let canvas = sketch._curElement.canvas
      let save_filename = argv.n > 1 ? filename + '_' + int : filename

      save({
        canvas: canvas,
        filename: save_filename,
        dir: current_dir
      })

      int++

      if(int >= argv.n) process.exit(0)
    }, 100)
  }, 500)
}
