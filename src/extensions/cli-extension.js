module.exports = toolbox => {
  toolbox.foo = () => {
    toolbox.print.info( 'called foo extension' )
  }
}