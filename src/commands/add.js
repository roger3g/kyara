module.exports = {
  name: 'add',
  description: 'Install an npm package (Use -D to install as devDependencies)',
  run: async toolbox => {
    const {packageManager, parameters, print} = toolbox
    const package = parameters.first

    await packageManager.add( package , {
      dev: parameters.options.D == true ? true : false,
      dryRun: false
    } )
    
    return print.success(`${parameters.first} added`)
  }
}