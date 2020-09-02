module.exports = {
  name: 'add',
  description: 'Install an npm package',
  run: async toolbox => {
    const { packageManager , parameters } = toolbox
    const package = parameters.first

    await packageManager.add( package , {
      dev: true,
      dryRun: false
    } )
  }
}