var program = require('commander');
var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');

program.version('0.0.1').option('-p, --path [path]', 'Path to the markdown directory').parse(process.argv);
  
var config_file = path.join(program.path, 'config.yaml');

console.log(config_file);

var config = yaml.safeLoad(fs.readFileSync(config_file, 'utf8'));

console.log(config);
