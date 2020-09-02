const fs = require( 'fs' )
const path = require( 'path' )

const { open } = fs
const { join } = path

module.exports = {
  name: 'generate',
  description: 'Create file',
  alias: ['g'],
  run: async toolbox => {
    const { parameters , print } = toolbox
    const file = parameters.first
    const path = process.cwd() 

    open( join( path, `/${file}` ) , 'w' , ( err ) => {
      if ( err ) { throw err }
       print.success( 'File created!' )
    } )
  }
}