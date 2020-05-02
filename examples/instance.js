const p5 = require('p5')

let sketch = p => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight)
  }

  p.draw = () => {
    p.background('#ED225D')
    p.noStroke()
    p.fill('#FFFFFF')

    for (let i = 20; i < p.width; i += 40) {
      for (let j = 20; j < p.height; j += 40) {
        let size = Math.sin(i + p.frameCount * 0.01)
        size += Math.cos(j + p.frameCount * 0.1)
        size *= 20

        p.ellipse(i, j, size, size)
      }
    }
  }
}

let p5sketch = new p5(sketch)

module.exports = p5sketch
