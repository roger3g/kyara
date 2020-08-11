const os = require( 'os' )
const { freemem , totalmem , arch , endianness , platform , type , uptime , version , hostname } = os

const command = {
  name: 'kyara os',
  description: 'Exibe informações do systema operacional',
  run: async toolbox => {
    setInterval( infoOs , 500 )
  }
}

function infoOs () {
  const total = parseInt( totalmem() / 1024 / 1024 )
  const mem = parseInt( freemem() / 1024 / 1024 )
  const percents = parseInt( ( mem / total ) * 100 )
  const activeMinutes = parseInt( uptime() / 60 )

  const newDate = new Date()
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  const seconds = newDate.getSeconds()

  const content = {
    'Operating System Type': type(),
    'Kernel version': version(),
    'Operational system': platform(),
    'CPU architecture': arch(),
    'CPU endianness': endianness(),
    'Hostname': hostname(),
    'Total memory': `${total} MB`,
    'Free memory': `${mem} MB`,
    'Memory in use': `${percents} %`,
    'Uptime': `${activeMinutes} minutos`,
    'Hours': `${hours} h : ${minutes} m : ${seconds} s`
  }

  console.clear()
  console.table( content )  
  console.log( '|-  ^c To exit  -|' )
}

module.exports = command
