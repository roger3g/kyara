const command = {
  name: 'kyara',
  run: async toolbox => {
    const { print } = toolbox
    print.success( 'Bem-vindo a kyara CLI' )
  }
}

module.exports = command
