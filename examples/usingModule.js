const path = require('path')
const snap = require('../lib/snap.js')

// in your code it would look like this
// const snap = require('p5snap/lib/snap.js')

snap({
  sketch_path: path.resolve(__dirname, './instance.js'),
  output_path: path.resolve(__dirname),
  width: 1920,
  height: 1080,
  instance: true,
  filename: 'preview',
  num_images: 20,
  delay: 500
})
