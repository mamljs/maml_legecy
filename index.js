var program = require('commander');
var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');


program.version('0.0.1')
    .option('-i, --input [path]', 'Path to the input directory')
    .option('-o, --output [path]', 'Path to the output directory')
    .parse(process.argv);


var config_file = path.join(program.input, 'config.yaml');
var config = yaml.safeLoad(fs.readFileSync(config_file, 'utf8'));
console.log(config);


var home_page = path.join(program.input, 'index.md');
console.log(home_page);

var mdc = require('markdown-core/markdown-core-node');

var result = mdc.render(fs.readFileSync(home_page, 'utf8'));

console.log(result);
