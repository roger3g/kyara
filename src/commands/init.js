const { writeFile } = require( 'fs' )
const { join } = require( 'path' )

module.exports = {
  name: 'init',
  description: 'package.json',
  run: async toolbox => {
    const { print } = toolbox
    const path = process.cwd()
    
    writeFile( 'package.json', packageData, {enconding: 'utf-8', flag: 'w'}, error => {
      return error ? error : print.success( 'package.json created' )
    })
  }
}

const packageData = `{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [],
  "author": {
    "name": "",
    "email": "",
    "url": ""
  },
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}`