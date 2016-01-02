var program = require('commander');
var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');
var mustache = require('mustache');
var ncp = require('ncp').ncp;


program.version('0.0.1')
    .option('-i, --input [path]', 'Path to the input directory')
    .option('-o, --output [path]', 'Path to the output directory')
    .parse(process.argv);


ncp('node_modules/markdown-core/dist', path.join(program.output, 'dist'), function(err){
    fs.unlink(path.join(program.output, 'dist/markdown-core.min.js'));
});


var config_file = path.join(program.input, 'config.yaml');
var config = yaml.safeLoad(fs.readFileSync(config_file, 'utf8'));
console.log(config);

var templates_path = path.join(program.input, 'templates');
var layout = fs.readFileSync(path.join(templates_path, 'layout.html'), 'utf8');
console.log(layout);

var home_page = path.join(program.input, 'index.md');
var mdc = require('markdown-core/markdown-core-node');
var result = mdc.render(fs.readFileSync(home_page, 'utf8'));
console.log(result);
result = mustache.render(layout, {
    content: result,
    title: config.title + config.title_suffix,
    brand: config.name,
    navbar: '<li><a href="#">Link 1</a></li><li><a href="#">Link 2</a></li>'
});
console.log(result);
fs.writeFileSync(path.join(program.output, 'index.html'), result);
