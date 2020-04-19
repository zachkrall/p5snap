const fs       = require('fs')
const path     = require('path')
const chalk    = require('chalk')

const gridMsg  = require('./gridMsg.js')


module.exports = ({ canvas, filename, dir } = {}) => {
  let string = canvas.toDataURL()

  let regex = /^data:.+\/(.+);base64,(.*)$/;

  let matches = string.match(regex);
  let ext = matches[1];
  let data = matches[2];
  let buffer = Buffer.from(data, 'base64');

  let file_name = filename + '.' + ext
  let file_path = path.resolve(dir, file_name)

  fs.writeFileSync(file_path, buffer);

  gridMsg(`${chalk.bold('Saved')}`,`${file_path}`);
}
