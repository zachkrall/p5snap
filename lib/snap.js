'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var jsdom = _interopDefault(require('jsdom'));
var vm = _interopDefault(require('vm'));
var chalk = _interopDefault(require('chalk'));

const { JSDOM } = jsdom;

const virtualdom = new JSDOM(``, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true
});

var dom = virtualdom;

/* Define Error Printing */
const errorMsg = s => console.log(chalk.red.bold(s));

const gridMsg = (title, value) =>
  console.log(`${(title + ':').padEnd(12, ' ')} ${value}`);

var console_1 = {
  errorMsg,
  gridMsg
};

const { gridMsg: gridMsg$1 } = console_1;

var save = ({ canvas, filename, dir } = {}) => {
  let string = canvas.toDataURL();

  let regex = /^data:.+\/(.+);base64,(.*)$/;

  let matches = string.match(regex);
  let ext = matches[1];
  let data = matches[2];
  let buffer = Buffer.from(data, 'base64');

  let file_name = filename + '.' + ext;
  let file_path = path.resolve(dir, file_name);

  fs.writeFileSync(file_path, buffer);

  gridMsg$1('Saved', file_path);
};

/* virtual dom */

const { Script } = vm;

/* load p5 as string */
const p5 = fs.readFileSync(
  path.resolve('./node_modules/p5/lib/p5.min.js'),
  {
    encoding: 'utf-8'
  }
);

/* file save utility */


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
  let interval = num_images;

  let sketch_contents =
    raw_sketch || fs.readFileSync(sketch_path, { encoding: 'UTF-8' });

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
          line.includes(`module.exports`)
        )
      })
      .join('\n');
  }

  const vmContext = dom.getInternalVMContext();

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
}`);

  const initDOM = new Promise((resolve, reject) => {
    dom.window.addEventListener('DOMContentLoaded', () => {
      sketch_script.runInContext(vmContext);
      resolve();
    });
  });

  const loop = async () => {
    setInterval(() => {
      if (!dom.window.document.querySelector('canvas')) {
        console.log('\nERROR: No canvas element found');
        process.exit(0);
      }

      save({
        canvas: dom.window.document.querySelector('canvas'),
        filename: filename + '_' + (num_images - interval),
        dir: output_path
      });

      // next step
      interval -= 1;

      // end when ready
      if (interval < 1) process.exit(0);
    }, delay + 500);
  };

  initDOM
    .then(() => {
      setTimeout(loop, 1000);
    })
    .catch(err => {
      console.error(err);
    });
}

var snap_1 = snap;

module.exports = snap_1;
