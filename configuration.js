var path = require('path');
var _ = require('underscore');
var yaml = require('js-yaml');
var file = require('./file');


var config = {
    cache: {}
};


// read configuration by folder url, such as '/download/'(or 'download' if you are lazy)
// first read configuration in parent folders, then override it with configuration from children folders
function get(url) {
    url = url.split('/').map(s => s.trim()).filter(s => s.length > 0).join('/');
    if(config.cache[url]) {
        return config.cache[url];
    }
    if(url == '') {
        var result = yaml.safeLoad(file.read('index.yaml'));
    } else {
        var parent = get(url.split('/').slice(0, -1).join('/')); // recursion
        parent = JSON.parse(JSON.stringify(parent)); // deep clone, don't want to change the original
        var result = _.assign(parent, yaml.safeLoad(file.read(path.join(url, 'index.yaml'))));
    }
    config.cache[url] = result;
    return result;
};


config.get = get;
module.exports = config;
