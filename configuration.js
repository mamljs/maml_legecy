var R = require('ramda')
var yaml = require('js-yaml')
var file = require('./file')

var config = {
  cache: {}
}

// first read configuration in parent folders, then override it with configuration from children folders
// configurations are cached in order to speed up
function get (url) {
  url = url.split('/').map(s => s.trim()).filter(s => s.length > 0).join('/')
  if (config.cache[url]) {
    return config.cache[url]
  }
  var result = {}
  if (url === '') {
    result = yaml.safeLoad(file.read('index.yml'))
  } else {
    var parent = get(url.split('/').slice(0, -1).join('/')) // recursion
    result = R.merge(parent, yaml.safeLoad(file.read(url, 'index.yml')))
  }
  config.cache[url] = result
  return result
};

config.get = get
module.exports = config
