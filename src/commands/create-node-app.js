const fs = require( 'fs' )
const path = require( 'path' )

const { mkdir , writeFile } = fs
const { join } = path

const command = {
  name: 'kyara create-node-app [path] [nome]',
  alias: ['n'],
  description: 'Cria a base de aquivos para apps com node e express',
  run: async toolbox => {
    const { print , parameters } = toolbox
    
    const folder = parameters.first
    const projectName = parameters.second
    const finalPath = join( `${folder}` , `/${projectName}` )

    if ( folder == undefined || projectName == undefined) {
      print.error( 'Error, application name or path has not been defined.' )
      return
    } else {
      
      // root
      await mkdir( finalPath , () => { return } )

      // public
      await mkdir( join( `${finalPath}` , 'public' ) , () => { return } )
      
      await mkdir( join( `${finalPath}/public` , 'assets' ) , () => { return } )
      await writeFile( join( `${finalPath}/public/assets` , '.gitkeep' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await mkdir( join( `${finalPath}/public` , 'pages' ) , () => { return } )
      await writeFile( join( `${finalPath}/public/pages` , '404-error.html' ) , page404Data , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await mkdir( join( `${finalPath}/public` , 'scripts' ) , () => { return } )
      await writeFile( join( `${finalPath}/public/scripts` , '.gitkeep' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await mkdir( join( `${finalPath}/public` , 'styles' ) , () => { return } )
      await writeFile( join( `${finalPath}/public/styles` , 'main.css' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )
      await writeFile( join( `${finalPath}/public/styles` , 'responsive.css' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await writeFile( join( `${finalPath}/public` , 'index.html' ) , indexHtmlData , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      // src
      await mkdir( join( `${finalPath}` , 'src' ) , () => { return } )

      await mkdir( join( `${finalPath}/src` , 'config' ) , () => { return } )
      await writeFile( join( `${finalPath}/src/config` , 'index.js' ) , indexConfigData , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await mkdir( join( `${finalPath}/src` , 'controllers' ) , () => { return } )
      await writeFile( join( `${finalPath}/src/controllers` , 'index.js' ) , indexControllersData , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await mkdir( join( `${finalPath}/src` , 'database' ) , () => { return } )
      await writeFile( join( `${finalPath}/src/database` , '.gitkeep' ) , '' , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await mkdir( join( `${finalPath}/src` , 'routes' ) , () => { return } )
      await writeFile( join( `${finalPath}/src/routes` , 'routes.js' ) , routesData , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await writeFile( join( `${finalPath}/src` , 'app.js' ) , appJsData , { enconding: 'utf-8', flag: 'w' } , () => { return } )
      await writeFile( join( `${finalPath}/src` , 'server.js' ) , serverJsdata , { enconding: 'utf-8', flag: 'w' } , () => { return } )

      await writeFile( join( `${finalPath}` , '.env' ) , 'PORT = 80' , { enconding: 'utf-8', flag: 'w' } , () => { return } )
      await writeFile( join( `${finalPath}` , '.gitignore' ) , 'node_modules/' , { enconding: 'utf-8', flag: 'w' } , () => { return } )      
      await writeFile( join( `${finalPath}` , 'package.json' ) , packageJsonData , { enconding: 'utf-8', flag: 'w' } , () => { return } )

    } 
  }
}

const packageJsonData = `{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "repository": {
    "type": "",
    "url": ""
  },
  "keywords": [],
  "author": {
    "name": "",
    "email": "",
    "url": ""
  },
  "license": "MIT",
  "dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "nunjucks": "^3.2.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.4"
  }
}`

const page404Data = `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="">
    <meta name="description" content="">
    <meta name="copyright" content="">
    <meta name="keywords" content="">
    <meta name="robot" content="index">
    <meta name="generator" content="">
    <meta name="author" content="">
    <title>Página não encontrada</title>
    
    <link rel="stylesheet" href="">
    <script src="" type="text/javascript"></script>

  </head>
  <body>

    <h1>404</h1>
    <h2>Página não encontrada</h2>

  </body>
</html>`

const indexHtmlData = `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="">
    <meta name="description" content="">
    <meta name="copyright" content="">
    <meta name="keywords" content="">
    <meta name="robot" content="index">
    <meta name="generator" content="">
    <meta name="author" content="">
    <title>Home</title>
    
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="stylesheet" href="/styles/responsive.css">
    
    <script src="" type="text/javascript"></script>

  </head>
  <body>

    <h1>Welcome to your server!</h1>

  </body>
</html>`

const appJsData = `const nunjucks = require( 'nunjucks' )
const path = require( 'path' )

const routes = require( './routes/routes.js' )

const express = require( 'express' )
const app = express()


// Configurar nunjucks
nunjucks.configure( path.join( __dirname , '/../public/pages' ) , { 
  express: app,
  noCache: true
} )

// Dados do req.body
// app.use( express.urlencoded( { extended: true } ) ) // Só é necessário se você for pegar dados de formulário do front
app.use( express.static( path.join( __dirname , '/../public/' ) ) ) // Configurações dos arquivos státicos

app.get( '/', routes )
app.get( '*', routes ) // Esta rota deve sempre ser a última!

module.exports = app`

const serverJsdata = `require( 'dotenv' ).config()

const app = require( './app.js' )
const config = require( './config/index.js' )

const PORT = config.app.port

app.listen( PORT , ( err ) => {
  if ( err ) {
    console.log( 'erro' )
  }
  console.log( 'Server running on localhost:80 or 3000' ) // Troque por uma Template Literals com a constante PORT
} )`

const indexConfigData = `module.exports = {
  app: {
    port: process.env.PORT || 3000,
  }
}`

const indexControllersData = `const controllers = {
  pageHome( req, res ) {
    res.render( 'index.html' )
  },
  page404( req, res ) {
    res.render( '404-error.html' )
  }
}

module.exports = controllers`

const routesData = `const router = require('express').Router()
const controllers = require('./../controllers/index.js')

const { pageHome , page404 } = controllers

router.get( '/' , pageHome )
router.get( '*' , page404 )

module.exports = router`

module.exports = command