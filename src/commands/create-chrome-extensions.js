const { mkdir, writeFile } = require('fs')
const { join } = require('path')

module.exports = {
  name: 'create-chrome-extensions',
  alias: ['cce'],
  description: 'Create a base file structure for chrome extensions',
  run: async toolbox => {
    const {print, parameters} = toolbox
    
    const projectName = parameters.first
    const path = join(process.cwd(), `/${projectName}`)

    if (projectName == undefined) {
      return print.error('Error, name has not been defined')
    } else {
      mkdir(path ,() => { return })
      writeFileData(path, 'content.js', '')
      writeFileData(path, 'style.css', '')
      writeFileData(path, 'manifest.json', manifestData)
      return print.success('Created project')
    }
  }
}

function writeFileData(path, file , data) {
  writeFile(join(`${path}`, file), data, {enconding: 'utf-8', flag: 'w'}, () => {return})
}

const manifestData = `{
  "manifest_version": 2, // versão do manifesto (normalmente 2)
  "name": "Nome",        // nome da nossa extenção
  "version": "0.0.1",    // versão da nossa extenção
  "content_scripts": [
    {
      "matches": [
        "https://www.exemplo.com/" // em quais domínios nossa extenção vai rodar
      ], 
      "css": [
        "style1.css" // nosso(s) arquivo(s) css
      ], 
      "js": [
        "content1.js" // nosso(s) arquivo(s) javascript    
      ]
    }
  ]
}`