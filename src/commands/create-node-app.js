const fs = require( 'fs' ) 
const path = require( 'path' )

const { mkdir , writeFile } = fs
const { join } = path

module.exports = {
  name: 'create-node-app',
  alias: ['cna'],
  description: 'Creates the file base for apps with node and express',
  run: async toolbox => {
    const { print , parameters } = toolbox

    const projectName = parameters.first
    const path = join( process.cwd() , `/${projectName}` )
    
    if ( projectName == undefined) {
      print.error( 'Error, name or has not been defined' )
      return
    } else {

      // root
      mkdir( path , () => { return } )

      // public
      mkdir( join( `${path}` , 'public' ) , () => { return } )
      
      mkdir( join( `${path}/public` , 'assets' ) , () => { return } )
      writeFileData( `${path}/public/assets` , '.gitkeep' , '' )

      mkdir( join( `${path}/public` , 'pages' ) , () => { return } )
      writeFileData( `${path}/public/pages` , '404-error.html' , page404Data )

      mkdir( join( `${path}/public` , 'scripts' ) , () => { return } )
      writeFileData( `${path}/public/scripts` , '.gitkeep' , '' )

      mkdir( join( `${path}/public` , 'styles' ) , () => { return } )
      writeFileData( `${path}/public/styles` , 'main.css' , '' )
      writeFileData( `${path}/public/styles` , 'responsive.css' , '' )

      writeFileData( `${path}/public` , 'index.html' , indexHtmlData )

      // src
      mkdir( join( `${path}` , 'src' ) , () => { return } )

      mkdir( join( `${path}/src` , 'config' ) , () => { return } )
      writeFileData( `${path}/src/config` , 'index.js' , indexConfigData )

      mkdir( join( `${path}/src` , 'controllers' ) , () => { return } )
      writeFileData( `${path}/src/controllers` , 'index.js' , indexControllersData )

      mkdir( join( `${path}/src` , 'database' ) , () => { return } )
      writeFileData(  `${path}/src/database` , '.gitkeep' , '' )

      mkdir( join( `${path}/src` , 'routes' ) , () => { return } )
      writeFileData( `${path}/src/routes` , 'routes.js' , routesData )

      writeFileData( `${path}/src` , 'app.js' , appJsData )
      writeFileData( `${path}/src` , 'server.js' , serverJsdata )

      writeFileData( `${path}` , '.env' , 'PORT = 80' )
      writeFileData( `${path}` , '.gitignore' , 'node_modules' )      
      writeFileData( `${path}` , 'package.json' , packageJsonData )
      writeFileData( `${path}` , 'README.md' , '' )
      writeFileData( `${path}` , 'LICENSE.md' , LicenseData )

      mkdir( join( `${path}` , '.github' ) , () => { return } )
      writeFileData(  `${path}/.github` , '.gitkeep' , '' )

      print.success( 'Done' )
      return

    } 
  }
}

function writeFileData ( path , file , data ) {
  writeFile( join( `${path}` , file ) , 
    data , { enconding: 'utf-8', flag: 'w' } , () => {
      return
    } )
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
}
`

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

<link rel="stylesheet" href="/../styles/main.css">
<link rel="stylesheet" href="/../styles/responsive.css">

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
  console.log( 'Server running on localhost:' + PORT )
} )`

const indexConfigData = `module.exports = {
  app: {
    port: process.env.PORT || 3000,
  }
}`

const indexControllersData = `const controller = {
  pageHome( req, res ) {
    res.render( 'index.html' )
  },
  page404( req, res ) { // Esta rota deve sempre ser a última!
    res.render( '404-error.html' ) 
  }
}

module.exports = controller`

const routesData = `const router = require('express').Router()
const controller = require('./../controllers/index.js')

const { pageHome , page404 } = controller

router.get( '/' , pageHome )
router.get( '*' , page404 ) // Esta rota deve sempre ser a última!

module.exports = router`

const LicenseData = `The MIT License (MIT)

Copyright (c) 2020 [Autor]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
