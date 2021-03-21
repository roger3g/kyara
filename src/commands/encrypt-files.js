const crypto = require('crypto')
const {createReadStream, createWriteStream} = require('fs')
const { join } = require('path')

const algorithm = 'aes-256-ctr'
const password = ':6b%J3)p=.}b;h};.qupG=U+DbZv[w}{'

module.exports = {
  name: 'encrypt-files',
  alias: ['ef'],
  description: 'Encrypt specific files like ransomware ( No decryption! )',
  run: async toolbox => {
    const {parameters, print} = toolbox

    const fileName = parameters.first
    const path = join(process.cwd(), `/${fileName}`)

    if (fileName == undefined) {
      return print.error('Error, file not found')
    } else {
      encryptFile(path)
      return print.success('Done!')
    }
  }
}

function encryptFile (file) {
  const read = fs.createReadStream(file)
  const write = fs.createWriteStream(file)
  const cipher = crypto.createCipher(algorithm, password)
  read.pipe(cipher).pipe(write)
}