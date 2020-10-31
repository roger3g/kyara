const command = {
  name: 'kyara',
  run: async toolbox => {
    const { print } = toolbox
    print.success( 'Welcome to kyara CLI' )
    print.success( 'Access: https://github.com/roger3g/kyara for more details' )
  }
}

module.exports = command