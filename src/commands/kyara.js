const command = {
  name: 'kyara',
  run: async toolbox => {
    const { print } = toolbox
    print.info('Welcome to kyara CLI')
  }
}

module.exports = command
