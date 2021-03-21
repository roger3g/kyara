const { open } = require( 'fs' )
const { join } = require( 'path' )

module.exports = {
  name: 'generate',
  description: 'Create file',
  alias: ['g'],
  run: async toolbox => {
    const {parameters, print} = toolbox
    const file = parameters.first
    const path = process.cwd() 

    open(join(path, `/${file}`) , 'w' , error => {
      if (error) { print.error(error) }
       print.success('File created!')
    })
  }
}