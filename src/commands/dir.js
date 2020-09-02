module.exports = {
  name: 'dir',
  description: 'Shows the current directory',
  run: async toolbox => {
    const { print } = toolbox
    print.success( process.cwd() )
  }
}