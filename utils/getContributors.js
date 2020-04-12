const https    = require('https')

const package  = require('../package.json')
const README   = require('../README.js')

let request_url = 'https://api.github.com/repos/'
    request_url += package.repository.replace('github:','')
    request_url += '/contributors'

let options = { headers: {'user-agent': 'node.js'} }

let push_data = res => {
  res.on('data', d => {
    contributors_string += d
  })
}

let contributors_string = ``

let getContributors = new Promise( (resolve,reject)=>{

  https
  .get(request_url, options, push_data)
  .on('error', (e) => {
    console.error(e)
  })
  .on('close', () => {
    resolve(contributors_string)
  });

});

module.exports = getContributors;
