const command = {
  name: 'dir',
  alias: ['d'],
  description: 'Shows the current directory',
  run: async toolbox => {
    const { print } = toolbox
    print.info( __dirname )
  }
}

module.exports = command
