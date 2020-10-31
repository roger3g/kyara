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
      return print.error( 'Error, name or has not been defined' )
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
      writeFileData( `${path}` , '.gitignore' , gitignoreData )      
      writeFileData( `${path}` , 'package.json' , packageJsonData )
      writeFileData( `${path}` , 'README.md' , '' )
      writeFileData( `${path}` , 'LICENSE.md' , LicenseData )

      mkdir( join( `${path}` , '.github' ) , () => { return } )
      writeFileData(  `${path}/.github` , '.gitkeep' , '' )

      return print.success( 'Created project' )

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

nunjucks.configure( path.join( __dirname , '/../public/pages' ) , { 
  express: app,
  noCache: true
} )

app.use( express.urlencoded( { extended: true } ) )
app.use( express.static( path.join( __dirname , '/../public/' ) ) )

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
  pageHome( req , res ) {
    res.render( 'index.html' )
  },
  page404( req , res ) { // Esta rota deve sempre ser a última!
    res.render( 'pageNotFound.html' ) 
  }
}

module.exports = controller`

const routesData = `const router = require('express').Router()
const controller = require('./../controllers/index.js')

const { pageHome , page404 } = controller

router.get( '/' , pageHome )
router.get( '*' , page404 ) // Esta rota deve sempre ser a última!

module.exports = router`

const gitignoreData = `.DS_Store
node_modules
npm-debug.log
coverage
.nyc_output
dist
build
.vscode
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
`

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
