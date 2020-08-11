const command = {
  name: 'dir',
  description: 'Exibe o diretório atual',
  run: async toolbox => {
    const { print } = toolbox
    print.info( __dirname )
  }
}

module.exports = command