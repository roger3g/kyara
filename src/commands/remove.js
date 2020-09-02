module.exports = {
  name: 'remove',
  description: 'Remove an npm package',
  run: async toolbox => {
    const { packageManager , parameters } = toolbox
    const package = parameters.first

    await packageManager.remove( package , {
      dryRun: false,
    })
  }
}