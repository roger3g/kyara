const {freemem, totalmem} = require('os')

module.exports = {
  name: 'memory',
  alias: ['m'],
  description: 'Displays system memory status',
  run: async toolbox => {
    const { table } = toolbox.print
    
    setInterval(() => {
      const total = parseInt(totalmem() / 1024 / 1024)
      const mem = parseInt(freemem() / 1024 / 1024)
      const percents = parseInt((mem / total) * 100)

      console.clear()
      console.log('\n')

      table(
        [
          ['Property', 'Stats'],
          ['Total memory', `${total} MB`],
          ['Free memory', `${mem} MB`],
          ['Memory in use', `${percents} %`]
        ],
        {format: 'markdown'}
        )
      
      console.log('\n|-  ^c To exit  -|')
    }, 1000)
  }
}