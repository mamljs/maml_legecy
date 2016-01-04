var program = require('commander');
var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');
var mustache = require('mustache');
var ncp = require('ncp').ncp;
var mdc = require('markdown-core/markdown-core-node');
var config = require('./config');
var file = require('./file');
// var _ = require('underscore');


// read and parse command line args
program.version('0.0.1')
    .option('-i, --input [path]', 'Path to the input directory')
    .option('-o, --output [path]', 'Path to the output directory')
    .parse(process.argv);


file.reset();



var layout = file.read('templates/layout.html');


function generate_home_page() {
    var config = yaml.safeLoad(file.read('index.yaml'));
    var markdown = file.read('index.md');
    var html = mdc.render(markdown);
    html = mustache.render(layout, {
        content: html,
        title: config.title + config.title_suffix,
        brand: config.name,
        navbar: config.menu.map(function(link) {
                return '<li><a href="/' + link + '/">' + link + '</a></li>';
            }).join('')
    });
    file.write('index.html', html);

    config.menu.forEach(function(link) {
        generate_level_one_page(link);
    });
}


function generate_level_one_page(link) {
    var config = yaml.safeLoad(file.read('index.yaml'));
    var markdown = file.read(link + '/index.md');
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
    file.write(link + '/index.html', html);
}

generate_home_page();
config.get('test config');
