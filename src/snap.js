const fs = require('fs')
const path = require('path')

/* virtual dom */
const dom = require('./dom')
const { Script } = require('vm')

/* load p5 as string */
const p5 = require('fs').readFileSync(
  path.resolve(__dirname, '../node_modules/p5/lib/p5.min.js'),
  {
    encoding: 'utf-8'
  }
)

/* file save utility */
const save = require('./utils/save')

/* define snap function */
function snap({
  sketch_path,
  output_path = '.',
  raw_sketch,
  width = 1920,
  height = 1080,
  instance = false,
  filename = 'preview',
  delay = 0,
  num_images = 1
} = {}) {
  let interval = num_images

  let sketch_contents =
    raw_sketch || fs.readFileSync(sketch_path, { encoding: 'UTF-8' })

  if (instance) {
    /*
      filter out any require or export statements
    */
    sketch_contents = sketch_contents
      .split('\n')
      .filter(line => {
        return !(
          line.includes(`require('p5')`) ||
          line.includes(`require("p5")`) ||
          line.includes(`module.exports`) ||
          line.includes(`import p5`) ||
          line.includes(`export`)
        )
      })
      .join('\n')
  }

  const vmContext = dom.getInternalVMContext()

  const sketch_script = new Script(`
${p5}

try {
  ${sketch_contents}
} catch (e) {
  if(e.toString().includes('require is not defined')){
    console.log(\`\\nERROR: Script includes the require keyword... Did you try to run an instance file in global mode?\`)
  } else {
    console.error(e)
  }
}`)

  const initDOM = new Promise((resolve, reject) => {
    dom.window.addEventListener('DOMContentLoaded', () => {
      sketch_script.runInContext(vmContext)
      resolve()
    })
  })

  const loop = async () => {
    setInterval(() => {
      if (!dom.window.document.querySelector('canvas')) {
        console.log('\nERROR: No canvas element found')
        process.exit(0)
      }

      save({
        canvas: dom.window.document.querySelector('canvas'),
        filename: filename + '_' + (num_images - interval),
        dir: output_path
      })

      // next step
      interval -= 1

      // end when ready
      if (interval < 1) process.exit(0)
    }, delay + 500)
  }

  initDOM
    .then(() => {
      setTimeout(loop, 1000)
    })
    .catch(err => {
      console.error(err)
    })
}

module.exports = snap
