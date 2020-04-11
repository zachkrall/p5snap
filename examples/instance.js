(p) => {
  let x = 10;
  p.setup = () => {
    let canvas = p.createCanvas(400,400)
    p.background(0)
  }
  p.draw = () => {
    p.background(0)
    p.fill(255,0,0)
    p.rect(x,10,100,100)
    x += 30;
  }
}
