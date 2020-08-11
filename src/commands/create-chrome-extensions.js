const fs = require( 'fs' )
const path = require( 'path' )

const { mkdir , writeFile } = fs
const { join } = path

const manifestData = `{
  "manifest_version": 2, // versão do manifesto (normalmente 2)
  "name": "Nome",        // nome da nossa extenção
  "version": "0.0.1",      // versão da nossa extenção
  "content_scripts": [
    {
      "matches": [
        "https://www.exemplo1.com/", // em quais domínios nossa extenção vai rodar
        "https://www.exemplo2.com/",
        "https://www.exemplo3.com/",
        "https://www.exemploN.com/"
      ], 
      "css": [
        "style1.css", // nosso(s) arquivo(s) css
        "style2.css",
        "style3.css",
        "styleN.css"
      ], 
      "js": [
        "content1.js", // nosso(s) arquivo(s) javascript    
        "content2.js",
        "content3.js",
        "contentN.js"
      ]
    }
  ]
}`

const command = {
  name: 'create-chrome-extensions',
  alias: ['cce'],
  description: 'Cria uma estrutura base de aqruivos para extenções chrome',
  run: async toolbox => {
    const { print , parameters } = toolbox
    
    const folder = parameters.first
    const projectName = parameters.second
    const finalPath = join( `${folder}` , `/${projectName}` )

    if ( folder == undefined || projectName == undefined) {
      print.error( 'Erro, nome ou caminho não foi definido.' )
      return
    } else {

      await mkdir( finalPath , () => { return } )

      await writeFile( join( `${finalPath}` , 'content.js' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )
      await writeFile( join( `${finalPath}` , 'style.css' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )
      await writeFile( join( `${finalPath}` , 'manifest.json' ) , manifestData , { enconding: 'utf-8', flag: 'w' } , () => { return } )

    }

  }
}

module.exports = command
