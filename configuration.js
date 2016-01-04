var path = require('path');
var _ = require('underscore');
var yaml = require('js-yaml');
var file = require('./file');


// read configuration by folder url, such as '/download/'(or 'download' if you are lazy)
// first read configuration in parent folders, then override it with configuration from children folders
function get(url) {
    var tokens = url.split('/').map(s => s.trim()).filter(s => s.length > 0);
    tokens.unshift('/');
    var config_files = tokens.map((_, i) => path.join(tokens.slice(0, i + 1).join('/'), 'index.yaml'));
    var config = config_files.reduce(function(result, item){ return _.assign(result, yaml.safeLoad(file.read(item))) }, {});
    return config;
};


module.exports = {
    get: get
};
