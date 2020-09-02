const command = {
  name: 'kyara',
  run: async toolbox => {
    const { print } = toolbox
    print.success( 'Welcome to kyara CLI' )
    print.success( 'Access: https://github.com/Rogerluiz0/kyara for more details' )
  }
}

module.exports = command