const os = require( 'os' )
const { arch , endianness , platform , type , uptime , version , hostname } = os

const newDate = new Date()
const hours = newDate.getHours()
const minutes = newDate.getMinutes()
const seconds = newDate.getSeconds()
const activeMinutes = parseInt( uptime() / 60 )

module.exports = {
  name: 'os',
  description: 'Displays operating system information',
  run: async toolbox => {
    const { table } = toolbox.print

    console.log( '\n' )
    table(
      [
        ['Property', 'Stats'],
        ['Operating System Type', type()],
        ['Kernel version', version()],
        ['Operational system', platform()],
        ['CPU architecture', arch()],
        ['CPU endianness', endianness()],
        ['Hostname', hostname()],
        ['Uptime', `${activeMinutes} minutos`],
        ['Hours', `${hours} h : ${minutes} m : ${seconds} s`]
      ],
      { format: 'markdown' }
    )
    console.log( '\n' )
  }
}