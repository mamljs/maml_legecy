const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const exec = require('child_process').exec
const glob = require('glob')

function copyAssets () {
  exec(`cp -r assets/* ${global.output}`)
}

// you can specify the input file path as multiple tokens
function read () {
  let filePath = 'models'
  for (let i = 0; i < arguments.length; i++) {
    filePath = path.join(filePath, arguments[i])
  }
  return fs.readFileSync(filePath, 'utf8')
}

// you can specify the output file path as multiple tokens
function write () {
  const content = arguments[arguments.length - 1]
  let filePath = global.output
  for (let i = 0; i < arguments.length - 1; i++) {
    filePath = path.join(filePath, arguments[i])
  }
  mkdirp(path.dirname(filePath), err => {
    if (err) {
      throw err
    }
    fs.writeFileSync(filePath, content)
  })
}

// list all the folders which contain `index.md`
function list () {
  const files = glob.sync('models/**/index.md')
  const folders = files.map(file => {
    const folder = file.split('/').slice(1, -1).join('/')
    if (folder === '') {
      return '/'
    } else {
      return `/${folder}/`
    }
  })
  return folders
}

module.exports = {
  copyAssets: copyAssets,
  read: read,
  write: write,
  list: list
}
