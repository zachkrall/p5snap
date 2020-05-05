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
const fs = require('fs')
const path = require('path')

/* cli */
const cli = require('./cli')
const args = cli.argv

/* console logging with style */
const { errorMsg, gridMsg } = require('./utils/console')

/* input path */
const input_path = args._[0]

/* validate input */
if (!input_path) {
	cli.showHelp()
	errorMsg(`\nNo File Provided`)
	process.exit(0)
}

/* set output file name */
const filename = input_path.match(/[A-z]*.js$/g)[0].replace(/.js/, '')

/* locate sketch file */
const current_dir = process.cwd()
const output_dir = args.o ? path.resolve(args.o) : current_dir
const sketch_file = path.resolve(current_dir, input_path)

if (args.v) console.log(`\n[ VERBOSE MODE ]\n`)

if (args.v) gridMsg(`Input File`, `${sketch_file}`)
if (args.v) gridMsg(`Output Dir`, `${output_dir}`)
if (args.v) gridMsg(`Filename`, `${filename}.png`)

/* file validation */
if (!fs.existsSync(sketch_file)) {
	errorMsg(`\n❌ Input file does not exist:\n${sketch_file}`)
	process.exit(0)
} else {
	if (args.v) console.log(`\nFile Exists!`)
}

/* snap module */
const snap = require('./snap')

let num_images = args.n

if (args.v) console.log(`\nSaving ${num_images} images\n`)

snap({
	sketch_path: sketch_file,
	output_path: output_dir,
	width: args.width,
	height: args.height,
	instance: args.i,
	filename: filename,
	delay: args.d,
	num_images: num_images
})
