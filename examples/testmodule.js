const path = require('path');
const snap = require('../src/snap.js');

snap({
  sketch_path: path.resolve(__dirname, './instance.js'),
  output_path: path.resolve(__dirname),
  width:1920,
  height:1080,
  instance:true,
  filename:'preview',
})
