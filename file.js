var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var exec = require('child_process').exec
var glob = require('glob')

function copyAssets () {
  exec(`cp -r assets/* ${global.output}`)
}

// you can specify the input file path as multiple tokens
function read () {
  var filePath = 'models'
  for (var i = 0; i < arguments.length; i++) {
    filePath = path.join(filePath, arguments[i])
  }
  return fs.readFileSync(filePath, 'utf8')
}

// you can specify the output file path as multiple tokens
function write () {
  var content = arguments[arguments.length - 1]
  var filePath = global.output
  for (var i = 0; i < arguments.length - 1; i++) {
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
  var files = glob.sync('models/**/index.md')
  var folders = files.map(file => {
    var folder = file.split('/').slice(1, -1).join('/')
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
