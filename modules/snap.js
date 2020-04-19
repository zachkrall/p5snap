const fs        = require('fs')
const path      = require('path')
const jsdom     = require('jsdom')

const { JSDOM } = jsdom;
const dom       = new JSDOM(`...`, { runScripts: "outside-only" })

const save      = require('../src/save')

function snap({
  sketch_path,
  output_path='.',
  raw_sketch,
  width=1920,
  height=1080,
  instance=false,
  filename='preview',
} = {}){

  global.window            = dom.window
  global.document          = window.document
  global.screen            = window.screen
  global.navigator         = window.navigator
  global.HTMLCanvasElement = window.HTMLCanvasElement

  window.innerWidth = width
  window.innerHeight = height

  const p5 = require('p5')

  const sketch_contents = raw_sketch || fs.readFileSync(sketch_path, {encoding: 'UTF-8'})
  const mode = !instance ? 'global' : 'instance'

  if(mode == 'global'){
    /*
      GLOBAL MODE
    */

    // ... set timeout used for waiting for virtual dom to "load"
    // TODO: use window.onload event?
    setTimeout( ()=>{
      window.eval(`${sketch_contents}`)
      new p5()
      window.eval(`noLoop()`)

      for(let timer=0;timer<200;timer++){
        window.eval(`_draw()`)
      }

      // there should only be a single canvas in our dom
      let canvas = document.querySelector('canvas')
      let save_filename = filename

      save({
        canvas: canvas,
        filename: save_filename,
        dir: output_path
      })

    }, 500)
  } else {
    /*
      INSTANCE MODE
    */
    let sketch

    // there must be a better way to 'wait'
    // for the fake dom to update after loading p5...
    setTimeout( ()=>{
      eval(`sketch = new p5(${sketch_contents})`)
      eval(`sketch.noLoop()`)
      eval(`sketch._draw()`)

      for(let timer=0;timer<200;timer++){
        eval(`sketch._draw()`)
      }

      let canvas = sketch._curElement.canvas
      let save_filename = filename

      save({
        canvas: canvas,
        filename: save_filename,
        dir: output_path
      })

    }, 500)
  }

}

module.exports = snap
