var program = require('commander');
var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');
var mustache = require('mustache');
var ncp = require('ncp').ncp;
var mdc = require('markdown-core/markdown-core-node');
var mkdirp = require("mkdirp");
var config = require('./config');
// var _ = require('underscore');


// read and parse command line args
program.version('0.0.1')
    .option('-i, --input [path]', 'Path to the input directory')
    .option('-o, --output [path]', 'Path to the output directory')
    .parse(process.argv);


// copy assets into output directory
ncp('node_modules/markdown-core/dist', path.join(program.output, 'dist'), function(err){
    fs.unlink(path.join(program.output, 'dist/markdown-core.min.js'));
});


function read_file(relative_path) {
    var absolute_path = path.join(program.input, relative_path);
    return fs.readFileSync(absolute_path, 'utf8');
}
var layout = read_file('templates/layout.html');


function write_file(relative_path, content) {
    var absolute_path = path.join(program.output, relative_path);
    mkdirp(path.dirname(absolute_path), function (err) {
        fs.writeFileSync(absolute_path, content);
    });
}


function generate_home_page() {
    var config = yaml.safeLoad(read_file('index.yaml'));
    var markdown = read_file('index.md');
    var html = mdc.render(markdown);
    html = mustache.render(layout, {
        content: html,
        title: config.title + config.title_suffix,
        brand: config.name,
        navbar: config.menu.map(function(link) {
                return '<li><a href="/' + link + '/">' + link + '</a></li>';
            }).join('')
    });
    write_file('index.html', html);

    config.menu.forEach(function(link) {
        generate_level_one_page(link);
    });
}


function generate_level_one_page(link) {
    var config = yaml.safeLoad(read_file('index.yaml'));
    var markdown = read_file(link + '/index.md');
    var html = mdc.render(markdown);
    var html = mustache.render(layout, {
        content: html,
        title: link + config.title_suffix,
        brand: config.name,
        navbar: config.menu.map(function(_link) {
                if(link == _link) {
                    return '<li class="active"><a href="/' + _link + '/">' + _link + '</a></li>';
                } else {
                    return '<li><a href="/' + _link + '/">' + _link + '</a></li>';
                }
            }).join('')
    });
    write_file(link + '/index.html', html);
}

generate_home_page();
config.get('test config');
