const fs = require( 'fs' )
const path = require( 'path' )

const { mkdir , writeFile } = fs
const { join } = path

module.exports = {
  name: 'create-vue-component',
  alias: ['cvc'],
  description: 'Creates a vue component',
  run: async toolbox => {
    const { print , parameters } = toolbox
    
    const componentName = parameters.first
    const path = join( process.cwd() , `/${componentName}` )

    if ( componentName == undefined ) {
      return print.error( 'Error, name has not been defined' )
    } else {
      mkdir( path , () => { return } )
      writeFileData ( path , `${componentName}.vue` , componentContent )
      return print.success( 'Component created' )
    }
  }
}

function writeFileData ( path , file , data ) {
  writeFile( join( `${path}` , file ) , 
  data , { enconding: 'utf-8', flag: 'w' } , () => {
    return
  } )
}

const componentContent = `<template>
  <div id="container">
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
</style>`