const fs = require( 'fs' )
const path = require( 'path' )

const { readFile } = fs
const { join } = path

module.exports = {
  name: 'view',
  description: 'Shows the contents of a file',
  alias: ['vw'],
  run: async toolbox => {
    const { parameters , print } = toolbox
    const file = parameters.first
    const path = process.cwd() 

    if ( file == undefined ) {
      return print.error( 'Error, file not found' )
    } else {
      return readFile( join( path , `/${file}`) , 'utf8' , ( err, data ) => {
        if ( err ) { throw err }
          print.info( data )
      } ) 
    }
  }
}