const fs = require( 'fs' )
const path = require( 'path' )

const { readFile } = fs
const { join } = path

module.exports = {
  name: 'view',
  description: 'Shows the contents of a file',
  alias: ['v'],
  run: async toolbox => {
    const { parameters , print } = toolbox
    const file = parameters.first
    const path = process.cwd() 

    readFile( join( path , `/${file}`) , 'utf8' , ( err, data ) => {
      if ( err ) { throw err }
      print.info( data )
    } ) 
  }
}