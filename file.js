var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;
var glob = require('glob');


// remove output folder
function clean() {
  exec(`rm -rf ${global.output}`);
}


// you can specify the input file path as multiple tokens
function read() {
  var file_path = 'models';
  for(var i = 0; i < arguments.length; i++) {
    file_path = path.join(file_path, arguments[i]);
  }
  return fs.readFileSync(file_path, 'utf8');
}


// you can specify the output file path as multiple tokens
function write() {
  var content = arguments[arguments.length - 1];
  var file_path = global.output;
  for(var i = 0; i < arguments.length - 1; i++) {
    file_path = path.join(file_path, arguments[i]);
  }
  mkdirp(path.dirname(file_path), err => {
    fs.writeFileSync(file_path, content);
  });
}


// list all the folders which contain `index.md`
function list() {
  var files = glob.sync('models/**/index.md');
  var folders = files.map(file => {
    var folder = file.split('/').slice(1, -1).join('/');
    if(folder == '') {
      return '/';
    } else {
      return `/${folder}/`;
    }
  });
  return folders;
}


module.exports = {
  clean: clean,
  read: read,
  write: write,
  list: list
};
