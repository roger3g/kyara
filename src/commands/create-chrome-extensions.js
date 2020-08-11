const fs = require( 'fs' )
const path = require( 'path' )

const { mkdir , writeFile } = fs
const { join } = path

const command = {
  name: 'kyara create-chrome-extensions [path] [nome]',
  alias: ['ce'],
  description: 'Cria a base de arquivos para extençõs do chrome',
  run: async toolbox => {
    const { print , parameters } = toolbox
    
    const folder = parameters.first
    const projectName = parameters.second
    const finalPath = join( `${folder}` , `/${projectName}` )

    if ( folder == undefined || projectName == undefined) {
      print.error( 'Error, application name or path has not been defined.' )
      return
    } else {

      await mkdir( finalPath , () => { return } )

      await writeFile( join( `${finalPath}` , 'content.js' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )
      await writeFile( join( `${finalPath}` , 'style.css' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )
      await writeFile( join( `${finalPath}` , 'manifest.json' ) , manifestData , { enconding: 'utf-8', flag: 'w' } , () => { return } )

    }

  }
}

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

module.exports = command
