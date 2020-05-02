#! /usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var yargs = _interopDefault(require('yargs'));
var chalk = _interopDefault(require('chalk'));
var jsdom = _interopDefault(require('jsdom'));
var vm = _interopDefault(require('vm'));

var name = "p5snap";
var version = "0.1.1";
var description = "A command line tool for creating snapshots of p5 sketches";
var bin = "./lib/bin.js";
var scripts = {
	build: "rollup -c ./rollup.config.js",
	test: "npm run build && node ./lib/bin.js --verbose",
	"test:global": "npm run build && node ./lib/bin.js ./examples/global.js -n 10 --verbose",
	"test:instance": "npm run build && node ./lib/bin.js ./examples/instance.js -n 10 --instance --verbose",
	"test:frames": "npm run build && node ./lib/bin.js ./examples/frameCount.js -n 10 --verbose"
};
var repository = "github:zachkrall/p5snap";
var keywords = [
	"cli",
	"art",
	"generative",
	"p5.js"
];
var author = "Zach Krall";
var license = "MIT";
var bugs = {
	url: "https://github.com/zachkrall/p5snap/issues"
};
var homepage = "https://github.com/zachkrall/p5snap";
var dependencies = {
	canvas: "^2.6.1",
	chalk: "^4.0.0",
	jsdom: "^16.2.2",
	p5: "^1.0.0",
	yargs: "^15.3.1"
};
var devDependencies = {
	"@rollup/plugin-commonjs": "^11.1.0",
	"@rollup/plugin-json": "^4.0.3",
	rollup: "^2.7.6"
};
var _package = {
	name: name,
	version: version,
	description: description,
	bin: bin,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	dependencies: dependencies,
	devDependencies: devDependencies
};

var _package$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name,
  version: version,
  description: description,
  bin: bin,
  scripts: scripts,
  repository: repository,
  keywords: keywords,
  author: author,
  license: license,
  bugs: bugs,
  homepage: homepage,
  dependencies: dependencies,
  devDependencies: devDependencies,
  'default': _package
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var project = getCjsExportFromNamespace(_package$1);

const cli = yargs
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
  .epilog(`For more information: ${project.homepage}`);

var cli_1 = cli;

/* Define Error Printing */
const errorMsg = s => console.log(chalk.red.bold(s));

const gridMsg = (title, value) =>
  console.log(`${(title + ':').padEnd(12, ' ')} ${value}`);

var console_1 = {
  errorMsg,
  gridMsg
};

const { JSDOM } = jsdom;

const virtualdom = new JSDOM(``, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true
});

var dom = virtualdom;

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
  path.resolve(__dirname, '../node_modules/p5/lib/p5.min.js'),
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
          line.includes(`module.exports`) ||
          line.includes(`import p5`) ||
          line.includes(`export`)
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



/* cli */

const args = cli_1.argv;

/* console logging with style */
const { errorMsg: errorMsg$1, gridMsg: gridMsg$2 } = console_1;

/* input path */
const input_path = args._[0];

/* validate input */
if (!input_path) {
  cli_1.showHelp();
  errorMsg$1(`\nNo File Provided`);
  process.exit(0);
}

/* set output file name */
const filename = input_path.match(/[A-z]*.js$/g)[0].replace(/.js/, '');

/* locate sketch file */
const current_dir = process.cwd();
const output_dir = args.o ? path.resolve(args.o) : current_dir;
const sketch_file = path.resolve(current_dir, input_path);

if (args.v) console.log(`\n[ VERBOSE MODE ]\n`);

if (args.v) gridMsg$2(`Input File`, `${sketch_file}`);
if (args.v) gridMsg$2(`Output Dir`, `${output_dir}`);
if (args.v) gridMsg$2(`Filename`, `${filename}.png`);

/* file validation */
if (!fs.existsSync(sketch_file)) {
  errorMsg$1(`\n❌ Input file does not exist:\n${sketch_file}`);
  process.exit(0);
} else {
  if (args.v) console.log(`\nFile Exists!`);
}

/* snap module */


let num_images = args.n;

if (args.v) console.log(`\nSaving ${num_images} images\n`);

snap_1({
  sketch_path: sketch_file,
  output_path: output_dir,
  width: args.width,
  height: args.height,
  instance: args.i,
  filename: filename,
  delay: args.d,
  num_images: num_images
});
